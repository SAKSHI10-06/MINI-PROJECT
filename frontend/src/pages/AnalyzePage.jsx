
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/predict';

export default function AnalyzePage({ onAnalysisComplete }) {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      if (image?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  const readImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () =>
        reject(new Error('Could not read the selected image.'));

      reader.readAsDataURL(file);
    });

  const selectFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError('');

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a JPG, PNG, or WEBP image.');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must not exceed 10 MB.');
      event.target.value = '';
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
      fileName: file.name,
    });
  };

  const clearImage = () => {
    setImage(null);
    setError('');
  };

  const analyze = async () => {
    if (!image?.file || analyzing) return;

    setError('');
    setAnalyzing(true);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', image.file);

      setProgress(30);

      let response;

      try {
        response = await fetch(API_URL, {
          method: 'POST',
          body: formData,
        });
      } catch {
        throw new Error(
          'Cannot connect to the backend. Start FastAPI on port 8000 and check the API URL.'
        );
      }

      setProgress(60);

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          'The backend returned an invalid response. Check the backend terminal.'
        );
      }

      if (!response.ok) {
        const detail =
          typeof data.detail === 'string'
            ? data.detail
            : 'Crop analysis failed. Please try again.';

        throw new Error(detail);
      }

      if (
        data.success !== true ||
        typeof data.class_name !== 'string' ||
        !data.class_name.includes('___')
      ) {
        throw new Error(
          'The AI model did not return a valid crop prediction.'
        );
      }

      const imageDataUrl = await readImage(image.file);

      const [rawCrop, ...diseaseParts] = data.class_name.split('___');

      const rawDisease = diseaseParts.join('___');

      const cropName = rawCrop.replaceAll('_', ' ').trim();
      const diseaseName = rawDisease.replaceAll('_', ' ').trim();

      const isHealthy = rawDisease.toLowerCase() === 'healthy';

      const severityMap = {
        Low: 'Mild',
        Moderate: 'Moderate',
        High: 'Severe',
        Mild: 'Mild',
        Severe: 'Severe',
      };

      const backendSeverity = data.severity?.severity_level;

      const severityLevel = isHealthy
        ? 'Mild'
        : typeof backendSeverity === 'string'
          ? severityMap[backendSeverity] || backendSeverity
          : 'Not assessed';

      const confidence =
        typeof data.confidence === 'number' &&
        Number.isFinite(data.confidence) &&
        data.confidence >= 0 &&
        data.confidence <= 1
          ? Number((data.confidence * 100).toFixed(2))
          : null;

      const recommendations = Array.isArray(
        data.advisory?.recommendations
      )
        ? data.advisory.recommendations
            .map((item) => {
              if (typeof item === 'string') return item;

              if (item && typeof item.description === 'string') {
                return item.description;
              }

              if (item && typeof item.message === 'string') {
                return item.message;
              }

              return null;
            })
            .filter(Boolean)
        : [];

      const symptomsSource =
        data.advisory?.symptoms ??
        data.advisory?.observed_symptoms ??
        data.advisory?.symptom_guidance ??
        [];

      const symptoms = Array.isArray(symptomsSource)
        ? symptomsSource.filter(
            (item) => typeof item === 'string' && item.trim()
          )
        : typeof symptomsSource === 'string' && symptomsSource.trim()
          ? [symptomsSource]
          : [];

      const result = {
        isMock: false,
        cropName,
        diseaseName: isHealthy ? 'Healthy' : diseaseName,
        scientificName: '',
        severityLevel,
        confidenceScore: confidence,
        affectedArea: 'Not measured',
        description:
          data.severity?.basis ||
          data.severity?.description ||
          data.advisory?.notice ||
          'This is a preliminary model prediction, not a confirmed field diagnosis.',
        symptoms,
        treatmentRecommendations: [
          {
            category: 'Crop care recommendations',
            icon: '🌱',
            steps: recommendations,
          },
        ],
      };

      const report = {
        result,
        imageDataUrl,
        fileName: image.fileName,
        rawPrediction: data,
        isDemo: false,
      };

      setProgress(100);

      if (typeof onAnalysisComplete === 'function') {
        onAnalysisComplete(report);
      }

      navigate('/results', {
        state: report,
      });
    } catch (analysisError) {
      console.error('AgriGrade analysis error:', analysisError);

      setError(
        analysisError instanceof Error
          ? analysisError.message
          : 'Unable to analyze the crop image.'
      );
    } finally {
      setAnalyzing(false);
      setProgress(0);
    }
  };

  return (
    <main className="analyze-page">
      <section className="analyze-container">
        <h1>Analyze Your Crop</h1>

        <p>
          Upload a clear image of a crop leaf to get an AI-based
          disease prediction and crop-care recommendations.
        </p>

        <div className="upload-card">
          {image ? (
            <div className="image-preview">
              <img
                src={image.preview}
                alt="Selected crop leaf"
                className="preview-image"
              />

              <p>{image.fileName}</p>

              <button
                type="button"
                onClick={clearImage}
                disabled={analyzing}
              >
                Remove image
              </button>
            </div>
          ) : (
            <label className="upload-area">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={selectFile}
                disabled={analyzing}
                hidden
              />

              <span className="upload-icon" aria-hidden="true">
                📷
              </span>

              <strong>Choose a crop-leaf image</strong>

              <span>
                Click to browse JPG, PNG, or WEBP files
              </span>

              <span>Maximum file size: 10 MB</span>
            </label>
          )}

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {analyzing && (
            <div className="progress-container">
              <p>Analyzing your crop image...</p>

              <progress
                value={progress}
                max="100"
                aria-label="Analysis progress"
              />

              <span>{progress}%</span>
            </div>
          )}

          <button
            type="button"
            onClick={analyze}
            disabled={!image || analyzing}
            className="analyze-button"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Crop'}
          </button>
        </div>
      </section>
    </main>
  );
}
