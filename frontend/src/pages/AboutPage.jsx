import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Eye, Layers, Globe2, Target, Microscope } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const timeline = [
  {
    phase: 'Phase 1',
    title: 'Image Capture & Preprocessing',
    desc: 'The farmer captures a photo of the affected crop part. The system preprocesses the image — resizing, normalising colour channels, and removing noise — to prepare it for model inference.',
  },
  {
    phase: 'Phase 2',
    title: 'AI Disease Detection',
    desc: 'A convolutional neural network (CNN) trained on agricultural image datasets classifies the crop disease from the image features, outputting a disease label and confidence score.',
  },
  {
    phase: 'Phase 3',
    title: 'Severity Assessment',
    desc: 'A secondary analysis estimates the proportion of the visible area affected by disease symptoms, mapping the result to a three-tier severity scale: Mild, Moderate, or Severe.',
  },
  {
    phase: 'Phase 4',
    title: 'Recommendation Engine',
    desc: 'Based on the detected disease and severity level, the system retrieves curated, agronomist-reviewed treatment recommendations from a structured knowledge base.',
  },
];

const principles = [
  {
    Icon: Brain,
    title: 'Computer Vision at Core',
    desc: 'AgriGrade uses deep learning models — specifically CNNs — trained to recognise visual disease patterns in crop images with high precision.',
  },
  {
    Icon: Layers,
    title: 'Three-Tier Severity Grading',
    desc: 'Rather than a binary healthy/diseased output, AgriGrade quantifies infection severity as Mild, Moderate, or Severe to help farmers prioritise resources.',
  },
  {
    Icon: Eye,
    title: 'Field-Condition Assessment',
    desc: 'The model is designed to work with real-world smartphone photos taken under varying lighting and angles — not just controlled lab images.',
  },
  {
    Icon: Globe2,
    title: 'Multilingual Architecture',
    desc: 'The platform is built to serve diverse linguistic communities, with output designed to be translated and localised without requiring core model changes.',
  },
  {
    Icon: Target,
    title: 'Precision Recommendations',
    desc: 'Treatment guidance is matched specifically to both the disease and severity level — avoiding generic advice that may be ineffective or wasteful.',
  },
  {
    Icon: Microscope,
    title: 'Science-Backed Guidance',
    desc: 'All treatment recommendations are grounded in peer-reviewed agricultural research and established best practices in plant pathology.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-24 px-5"
        style={{ backgroundColor: 'var(--mint-50)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
              style={{ backgroundColor: 'var(--mint-100)', borderColor: 'var(--mint-200)', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
            >
              About the Project
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl mb-8"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}
            >
              Crop Intelligence
              <br />
              <span style={{ color: 'var(--forest-500)' }}>for Every Farmer</span>
            </h1>
            <p
              className="text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}
            >
              AgriGrade is an AI-powered crop quality assessment platform that brings professional-grade disease detection and agronomic guidance to farmers of all scales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Project Overview ────────────────────────────────────────────────── */}
      <section className="py-24 px-5" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 border"
                style={{ backgroundColor: 'var(--mint-100)', borderColor: 'var(--mint-200)', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
              >
                Project Overview
              </div>
              <h2 className="text-4xl sm:text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
                Why AgriGrade Exists
              </h2>
              <div className="space-y-4">
                {[
                  'Crop disease is one of the leading causes of yield loss among smallholder farmers in sub-Saharan Africa. Early, accurate disease identification can dramatically reduce these losses — but expert agronomists are often unavailable, unaffordable, or simply too far away.',
                  'AgriGrade was conceived to address this gap: a tool that puts expert-level crop health assessment capability directly into a farmer\'s hand, accessible via any smartphone with a camera.',
                  'By combining computer vision with agricultural science and a thoughtful UX, AgriGrade aims to democratise access to precision agriculture — making it available to subsistence farmers and large commercial operations alike.',
                ].map((para, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-5">
                {[
                  { icon: '🎯', title: 'Mission', desc: 'Democratise access to professional crop disease assessment through AI-powered mobile technology.' },
                  { icon: '👁️', title: 'Vision', desc: 'A world where every farmer — regardless of location, language, or scale — can make evidence-based crop health decisions.' },
                  { icon: '📐', title: 'Approach', desc: 'Combine best-in-class computer vision, agronomic expertise, and human-centred design to build tools farmers actually want to use.' },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-6 rounded-2xl border"
                    style={{ backgroundColor: 'var(--mint-50)', borderColor: 'var(--mint-200)' }}
                  >
                    <div className="text-2xl mb-3">{icon}</div>
                    <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'var(--font-sans)', color: 'var(--neutral-900)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Innovation: How it works ─────────────────────────────────────────── */}
      <section
        id="innovation"
        className="py-24 px-5"
        style={{ backgroundColor: 'var(--mint-50)' }}
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 border"
              style={{ backgroundColor: 'var(--mint-100)', borderColor: 'var(--mint-200)', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
            >
              Innovation
            </div>
            <h2 className="text-4xl sm:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              The AI Pipeline
            </h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
              How AgriGrade transforms a smartphone photo into actionable crop health intelligence.
            </p>
          </ScrollReveal>

          <div className="space-y-6" id="how-it-works">
            {timeline.map(({ phase, title, desc }, i) => (
              <ScrollReveal key={phase} delay={i * 0.1}>
                <div
                  className="flex flex-col sm:flex-row gap-6 p-7 rounded-2xl border"
                  style={{ backgroundColor: '#fff', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: 'var(--forest-500)', color: '#fff', fontFamily: 'var(--font-sans)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--forest-500)', fontFamily: 'var(--font-sans)' }}>
                      {phase}
                    </p>
                    <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Principles ─────────────────────────────────────────────────── */}
      <section className="py-24 px-5" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Design Principles
            </h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
              The technical and ethical foundations that guide how AgriGrade is built.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map(({ Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="p-7 rounded-2xl border h-full"
                  style={{ backgroundColor: 'var(--mint-50)', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'var(--mint-100)', color: 'var(--forest-500)' }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'var(--font-sans)', color: 'var(--neutral-900)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
                    {desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future Possibilities ─────────────────────────────────────────────── */}
      <section
        className="py-24 px-5"
        style={{ backgroundColor: 'var(--mint-50)' }}
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Future Roadmap
            </h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
              Where AgriGrade is headed next.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🌍', title: 'Expanded Crop Coverage', desc: 'Extending disease detection to 50+ crop varieties across Africa and beyond.' },
              { icon: '🔊', title: 'Voice Interfaces', desc: 'Voice-guided analysis for farmers with limited literacy, in local languages.' },
              { icon: '🌐', title: 'Offline Mode', desc: 'On-device inference to work without internet connectivity in remote areas.' },
              { icon: '🤝', title: 'Community Reports', desc: 'Aggregated anonymous field data to map disease outbreak hotspots in real time.' },
            ].map(({ icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.08}>
                <div
                  className="p-6 rounded-2xl border text-center"
                  style={{ backgroundColor: '#fff', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="font-semibold text-sm mb-2" style={{ fontFamily: 'var(--font-sans)', color: 'var(--neutral-900)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-5" style={{ backgroundColor: 'var(--forest-600)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl mb-6 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              Start Analysing Today
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)' }}>
              Try the crop analysis interface and see AI-powered disease assessment in action.
            </p>
            <Link
              to="/analyze"
              id="about-cta-btn"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: '#fff', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--mint-100)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
            >
              Analyze a Crop <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
