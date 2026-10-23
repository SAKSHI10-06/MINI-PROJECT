
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnalyzePage from './AnalyzePage';
import heroBackground from '../assets/HeroSection.png';

const steps = [
  {
    number: '01',
    title: 'Take a crop photo',
    description:
      'Choose a clear photo of the leaf, fruit, or stem you want to check.',
  },
  {
    number: '02',
    title: 'See what to look for',
    description:
      'Review a sample assessment, possible affected areas, and crop care tips.',
  },
  {
    number: '03',
    title: 'Choose your next step',
    description:
      'Use the information as a starting point for checking with a local agriculture expert.',
  },
];

export default function HomePage({ onAnalysisComplete }) {
  const navigate = useNavigate();

  const scrollToAnalyze = (event) => {
    event.preventDefault();

    const section = document.getElementById('analyze');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="home-page">
      <section
        className="hero hero--landing"
        style={{
          backgroundImage: `url("${heroBackground}")`,
        }}
      >
        <motion.div
          className="hero__copy hero__copy--center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="eyebrow">
            <Sparkles size={14} />
            A HEALTHIER HARVEST STARTS HERE
          </div>

          <h1>
            Where nature meets
            <br />
            <span>healthier harvests.</span>
          </h1>

          <p className="hero__intro">
            Check crop health, learn what to look for, and get
            practical ideas to help care for your field.
          </p>

          <div className="hero__actions hero__actions--center">
            <a
              className="button button--primary"
              href="#analyze"
              onClick={scrollToAnalyze}
            >
              Check your crop <ArrowRight size={17} />
            </a>

            <a
              className="button button--light"
              href="#how-it-works"
            >
              How it works <ArrowDown size={15} />
            </a>
          </div>
        </motion.div>
      </section>

      <section
        className="home-highlights"
        aria-label="AgriGrade highlights"
      >
        <div className="page-shell home-highlights__inner">
          <div className="home-highlights__statement">
            <p>
              We're here to make crop health checks{' '}
              <strong>
                clearer, calmer, and more useful
              </strong>{' '}
              for every grower.
            </p>
          </div>

          <div className="home-highlights__items">
            <div>
              <strong>
                <ShieldCheck size={19} />
                Practical guidance
              </strong>
              <span>
                Simple steps for your next field check
              </span>
            </div>

            <div>
              <strong>
                <ScanLine size={19} />
                Photo-first checks
              </strong>
              <span>
                Start with a crop photo, right here
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="analyze">
        <AnalyzePage
          onAnalysisComplete={onAnalysisComplete}
        />
      </section>

      <section
        className="steps-section"
        id="how-it-works"
      >
        <div className="page-shell">
          <div className="section-heading">
            <span className="eyebrow">
              <Leaf size={14} />
              SIMPLE STEPS, USEFUL INSIGHTS
            </span>

            <h2>
              From a field photo to a clearer next step.
            </h2>

            <p>
              Easy to follow, with no complicated reports or
              hard-to-read charts.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map(
              ({ number, title, description }) => (
                <article
                  className="step-card"
                  key={number}
                >
                  <span className="step-card__number">
                    {number}
                  </span>

                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ),
            )}
          </div>

          <a
            className="button button--outline"
            href="#analyze"
            onClick={scrollToAnalyze}
          >
            Check a crop <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
