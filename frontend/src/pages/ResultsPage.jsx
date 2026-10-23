import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  Leaf,
  MapPin,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus,
} from 'lucide-react';

import { demoCropReport } from '../data/demoReport';
import { mockMarketPrices } from '../data/mockData';

const severityColors = {
  Mild: {
    foreground: '#397856',
    background: '#e8f3e9',
    description: 'Monitor the plant and check whether symptoms change.',
  },
  Moderate: {
    foreground: '#a66a1f',
    background: '#fff2da',
    description: 'Inspect the plant carefully and consider seeking local expert advice.',
  },
  Severe: {
    foreground: '#a9433e',
    background: '#fde9e7',
    description: 'Seek advice from a qualified local agricultural expert promptly.',
  },
  Healthy: {
    foreground: '#397856',
    background: '#e8f3e9',
    description: 'Continue monitoring the plant and maintain good crop care.',
  },
  'Not assessed': {
    foreground: '#777777',
    background: '#eeeeee',
    description: 'Disease severity has not been established.',
  },
};

function normalizeSeverity(value) {
  if (typeof value !== 'string') return 'Not assessed';

  const normalized = value.trim().toLowerCase();

  if (normalized === 'low' || normalized === 'mild') return 'Mild';
  if (normalized === 'moderate' || normalized === 'medium') return 'Moderate';
  if (normalized === 'high' || normalized === 'severe') return 'Severe';
  if (normalized === 'healthy') return 'Healthy';

  return 'Not assessed';
}

function getCropAndDisease(className, fallbackCrop, fallbackDisease) {
  if (typeof className === 'string' && className.includes('___')) {
    const [crop, ...diseaseParts] = className.split('___');

    return {
      cropName: crop.replaceAll('_', ' ').trim(),
      diseaseName: diseaseParts.join('___').replaceAll('_', ' ').trim(),
    };
  }

  return {
    cropName: fallbackCrop || 'Unknown crop',
    diseaseName: fallbackDisease || 'Prediction unavailable',
  };
}

function getStringList(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item.text === 'string') return item.text;
      if (item && typeof item.description === 'string') return item.description;
      return '';
    })
    .filter(Boolean);
}

function AffectedCropImage({ imageDataUrl, fileName }) {
  return (
    <div className="affected-photo-card">
      <div className="affected-photo">
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt={fileName ? `Uploaded crop image: ${fileName}` : 'Uploaded crop image'}
          />
        ) : (
          <div className="market-empty">No crop image available.</div>
        )}

        <span className="result-photo__tag">
          <Leaf size={14} /> CROP PHOTO
        </span>
      </div>

      <div className="affected-photo__legend">
        <span>Uploaded image</span>
        <small>
          Disease regions have not been individually segmented or detected.
        </small>
      </div>
    </div>
  );
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

function MarketPriceCard({ cropName }) {
  const rows = mockMarketPrices.entries
    .filter((entry) =>
      entry.crop.toLowerCase().includes(cropName.toLowerCase())
    )
    .slice(0, 3);

  const highestPrice = Math.max(...rows.map((entry) => entry.price), 1);

  return (
    <section className="market-card dashboard-card dashboard-market">
      <div className="market-card__heading">
        <div className="detail-card__title">
          <span className="detail-card__icon">
            <Coins size={21} />
          </span>
          <div>
            <span className="eyebrow">LOCAL MARKET SNAPSHOT</span>
            <h3>{cropName} prices</h3>
          </div>
        </div>

        <span className="market-card__currency">
          {mockMarketPrices.currency} · Demo data
        </span>
      </div>

      {rows.length > 0 ? (
        <div className="market-price-list">
          {rows.map((entry) => {
            const TrendIcon = trendIcons[entry.trend] || Minus;

            return (
              <article className="market-price-row" key={entry.id}>
                <span className="market-price-row__icon">
                  <MapPin size={16} />
                </span>

                <div className="market-price-row__place">
                  <strong>{entry.market}</strong>
                  <small>Per {entry.unit}</small>
                </div>

                <div
                  className="market-price-row__bar"
                  role="img"
                  aria-label={`${entry.market}: ${mockMarketPrices.currency} ${entry.price.toLocaleString()} per ${entry.unit}`}
                >
                  <span
                    style={{
                      width: `${(entry.price / highestPrice) * 100}%`,
                    }}
                  />
                </div>

                <strong className="market-price-row__price">
                  {mockMarketPrices.currency} {entry.price.toLocaleString()}
                </strong>

                <span className={`market-trend market-trend--${entry.trend}`}>
                  <TrendIcon size={13} />
                  {entry.change}
                </span>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="market-empty">
          There are no sample price entries for {cropName} yet.
        </p>
      )}

      <p className="market-card__disclaimer">
        Illustrative sample prices only—not live market data. Confirm current
        local rates before making sales decisions.
      </p>
    </section>
  );
}

export default function ResultsPage({ analysisResult }) {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();

  const isDemo = searchParams.get('demo') === 'tomato';

  const report = isDemo
    ? demoCropReport
    : analysisResult ?? state;

  if (!report?.result && !report?.rawPrediction) {
    return (
      <main className="results-page">
        <div className="page-shell results-shell results-empty">
          <span className="eyebrow">
            <Sparkles size={14} /> CROP HEALTH CHECK
          </span>

          <h1>No crop report yet.</h1>
          <p>Choose a crop photo first to prepare your assessment.</p>

          <Link className="button button--primary" to="/#analyze">
            <ArrowLeft size={16} /> Go to crop check
          </Link>
        </div>
      </main>
    );
  }

  const result = report.result ?? {};
  const raw = report.rawPrediction ?? {};

  const apiSeverity = raw.severity ?? {};
  const advisory = raw.advisory ?? {};

  const parsed = getCropAndDisease(
    raw.class_name,
    result.cropName,
    result.diseaseName
  );

  const cropName = parsed.cropName;
  const diseaseName = parsed.diseaseName;

  // Read the confidence returned by the backend.
  const rawConfidence =
    typeof raw.confidence === 'number'
      ? raw.confidence
      : typeof result.confidenceScore === 'number'
        ? result.confidenceScore / 100
        : null;

  const confidence =
    rawConfidence !== null &&
    Number.isFinite(rawConfidence) &&
    rawConfidence >= 0 &&
    rawConfidence <= 1
      ? Number((rawConfidence * 100).toFixed(2))
      : null;

  // Read the actual severity returned by the backend.
  const severityLevel = isDemo
    ? result.severityLevel ?? 'Not assessed'
    : normalizeSeverity(apiSeverity.severity_level);

  const severity =
    severityColors[severityLevel] ?? severityColors['Not assessed'];

  // FIX: Read the affected-area percentage from the API response.
  const rawAffectedArea = isDemo
    ? null
    : apiSeverity.measured_affected_leaf_area_percent;

  const affectedAreaPercent = isDemo
    ? null
    : typeof rawAffectedArea === 'number' &&
        Number.isFinite(rawAffectedArea) &&
        rawAffectedArea >= 0 &&
        rawAffectedArea <= 100
      ? rawAffectedArea
      : null;

  const affectedArea = isDemo
    ? result.affectedArea ?? 'Not measured'
    : affectedAreaPercent !== null
      ? `${affectedAreaPercent.toFixed(1)}%`
      : 'Not measured';

  const recommendations = isDemo
    ? (result.treatmentRecommendations ?? []).flatMap((group) =>
        (group.steps ?? []).slice(0, 3)
      )
    : getStringList(advisory.recommendations);

  const symptoms = isDemo
    ? getStringList(result.symptoms)
    : getStringList(
        advisory.symptoms ??
          advisory.observed_symptoms ??
          advisory.symptom_guidance
      );

  const description = isDemo
    ? result.description
    : advisory.description ||
      result.description ||
      `The model predicted ${diseaseName} in ${cropName}. Disease-specific information is unavailable.`;

  const circumference = 2 * Math.PI * 43;

  return (
    <motion.main
      className="results-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="page-shell results-shell">
        <Link className="back-link" to="/#analyze">
          <ArrowLeft size={16} /> Back to crop check
        </Link>

        <div className="results-intro">
          <span className="eyebrow">
            <Sparkles size={14} /> YOUR CROP CHECK
          </span>
          <h1>Here’s your crop overview.</h1>
          <p>
            Review the model prediction and available guidance. Classification
            is not a confirmed field diagnosis.
          </p>
        </div>

        {isDemo && (
          <div className="results-banner">
            <ShieldAlert size={17} />
            <span>
              <strong>Illustrative demo result.</strong> This is sample output,
              not an AI diagnosis. Confirm crop symptoms with a qualified local
              expert.
            </span>
          </div>
        )}

        <section
          className="results-dashboard"
          aria-label="Crop assessment dashboard"
        >
          <div className="dashboard-card dashboard-photo">
            <AffectedCropImage
              imageDataUrl={report.imageDataUrl}
              fileName={report.fileName}
            />
          </div>

          <article className="result-summary dashboard-card dashboard-diagnosis">
            <div className="result-summary__top">
              <span className="eyebrow">
                {isDemo ? 'SAMPLE DETECTION' : 'MODEL PREDICTION'}
              </span>

              <span
                className="severity-pill"
                style={{
                  color: severity.foreground,
                  backgroundColor: severity.background,
                }}
              >
                <span /> {severityLevel}
              </span>
            </div>

            <h2>{diseaseName}</h2>
            <p className="result-scientific">{cropName}</p>
            <p className="result-description">{description}</p>

            <p className="severity-explainer">
              <strong>Suggested next step:</strong> {severity.description}
            </p>
          </article>

          <article className="dashboard-card dashboard-metric dashboard-confidence">
            <span className="eyebrow">
              {isDemo ? 'SAMPLE MATCH' : 'MODEL CONFIDENCE'}
            </span>

            <div className="confidence-metric">
              <div
                className="confidence-ring"
                aria-label={
                  confidence === null
                    ? 'Confidence unavailable'
                    : `Model confidence ${confidence}%`
                }
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    className="confidence-ring__track"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    className="confidence-ring__value"
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset:
                        circumference * (1 - (confidence ?? 0) / 100),
                    }}
                  />
                </svg>
                <span>{confidence === null ? '—' : `${confidence}%`}</span>
              </div>

              <span>
                <strong>Confidence</strong>
                <small>
                  {confidence === null
                    ? 'Not provided by API'
                    : 'Predicted-class probability'}
                </small>
              </span>
            </div>
          </article>

          {/* FIXED: Affected Area card */}
          <article className="dashboard-card dashboard-metric dashboard-area">
            <span className="eyebrow">AFFECTED AREA</span>

            <strong className="dashboard-area__value">
              {affectedArea}
            </strong>

            <div
              className="area-progress"
              role="img"
              aria-label={
                affectedAreaPercent !== null
                  ? `Estimated affected leaf area: ${affectedAreaPercent.toFixed(1)}%`
                  : 'Affected leaf area is not available'
              }
            >
              <span
                style={{
                  width:
                    affectedAreaPercent !== null
                      ? `${affectedAreaPercent}%`
                      : '0%',
                }}
              />
            </div>

            <span className="dashboard-metric__note">
              {affectedAreaPercent !== null
                ? 'Estimated affected leaf area from the trained severity model. This is not a validated physical measurement.'
                : isDemo
                  ? 'Illustrative demo value, not a real measurement.'
                  : 'Affected leaf area is not available.'}
            </span>
          </article>

          <article className="dashboard-card dashboard-metric dashboard-severity">
            <span className="eyebrow">FIELD HEALTH</span>

            <strong style={{ color: severity.foreground }}>
              {severityLevel}
            </strong>

            <div
              className="severity-scale"
              role="img"
              aria-label={`Severity assessment: ${severityLevel}`}
            >
              {['Mild', 'Moderate', 'Severe'].map((level) => (
                <span
                  key={level}
                  className={severityLevel === level ? 'is-active' : ''}
                  style={
                    severityLevel === level
                      ? { '--severity-color': severity.foreground }
                      : undefined
                  }
                />
              ))}
            </div>

            <span className="dashboard-metric__note">
              {apiSeverity.basis ||
                'A validated field-severity assessment is not available.'}
            </span>
          </article>

          <article className="detail-card dashboard-card dashboard-symptoms">
            <div className="detail-card__title">
              <span className="detail-card__icon">
                <BadgeCheck size={21} />
              </span>
              <div>
                <span className="eyebrow">WHAT TO LOOK FOR</span>
                <h3>Symptoms to look for</h3>
              </div>
            </div>

            {symptoms.length > 0 ? (
              <ul className="symptom-list">
                {symptoms.map((symptom, index) => (
                  <li key={`${symptom}-${index}`}>
                    <CheckCircle2 size={18} />
                    {symptom}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No symptom details were supplied by the API. Inspect the
                affected leaves and consult a local agricultural expert to
                confirm the symptoms.
              </p>
            )}
          </article>

          <article className="detail-card dashboard-card dashboard-care">
            <div className="detail-card__title">
              <span className="detail-card__icon">
                <Leaf size={21} />
              </span>
              <div>
                <span className="eyebrow">PRACTICAL NEXT STEPS</span>
                <h3>Care suggestions</h3>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <div className="care-group">
                <h4><span>🌱</span> Crop care recommendations</h4>
                <ul>
                  {recommendations.map((step, index) => (
                    <li key={`${step}-${index}`}>{step}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>
                No disease-specific recommendations were returned by the API.
                Confirm the diagnosis before choosing a treatment.
              </p>
            )}

            {advisory.notice && (
              <p className="market-card__disclaimer">
                {advisory.notice}
              </p>
            )}
          </article>

          <MarketPriceCard cropName={cropName} />
        </section>

        {isDemo && (
          <section className="monitoring-card dashboard-card">
            <div className="detail-card__title">
              <span className="detail-card__icon">
                <ClipboardCheck size={19} />
              </span>
              <div>
                <span className="eyebrow">A SIMPLE FOLLOW-UP</span>
                <h3>What to check next</h3>
              </div>
            </div>

            <ol>
              {(demoCropReport.monitoringPlan ?? []).map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="results-actions">
          <p>Want to check another photo?</p>
          <Link className="button button--primary" to="/#analyze">
            Analyze another crop <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
