import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, ChevronDown, CheckCircle2, Leaf, AlertCircle, ChevronRight } from 'lucide-react';
import { diseaseLibrary } from '../data/mockData';
import ScrollReveal from '../components/ScrollReveal';

const severityStyles = {
  Mild:     { bg: '#dcfce7', border: '#bbf7d0', text: '#15803d', dot: '#22c55e' },
  Moderate: { bg: '#fef3c7', border: '#fde68a', text: '#92400e', dot: '#f59e0b' },
  Severe:   { bg: '#fee2e2', border: '#fecaca', text: '#991b1b', dot: '#ef4444' },
};

export default function TreatmentPage() {
  const [selectedId, setSelectedId] = useState(diseaseLibrary[0].id);
  const [openSection, setOpenSection] = useState('treatment');

  const disease = diseaseLibrary.find(d => d.id === selectedId);
  const sev = severityStyles[disease.severity];

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--mint-50)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
            style={{ backgroundColor: 'var(--mint-100)', borderColor: 'var(--mint-200)', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
          >
            <Pill size={12} /> Treatment Library
          </div>
          <h1 className="text-4xl sm:text-5xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
            Disease Treatment Advice
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
            Evidence-based guidance on managing crop diseases. Select a disease to view detailed treatment protocols.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Disease Selector ─────────────────── */}
          <div className="lg:col-span-1 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>
              Disease Library ({diseaseLibrary.length} conditions)
            </p>
            {diseaseLibrary.map(d => {
              const s = severityStyles[d.severity];
              const isActive = d.id === selectedId;
              return (
                <motion.button
                  key={d.id}
                  type="button"
                  id={`disease-select-${d.id}`}
                  onClick={() => { setSelectedId(d.id); setOpenSection('treatment'); }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-4 rounded-2xl border transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--forest-500)' : '#fff',
                    borderColor: isActive ? 'var(--forest-500)' : 'var(--mint-200)',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className="font-semibold text-sm mb-0.5"
                        style={{ fontFamily: 'var(--font-sans)', color: isActive ? '#fff' : 'var(--neutral-800)' }}
                      >
                        {d.disease}
                      </p>
                      <p className="text-xs" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--neutral-400)', fontFamily: 'var(--font-sans)' }}>
                        {d.crop} · <em>{d.pathogen}</em>
                      </p>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold border flex-shrink-0"
                      style={isActive
                        ? { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }
                        : { backgroundColor: s.bg, borderColor: s.border, color: s.text }
                      }
                    >
                      {d.severity}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── Detail Panel ─────────────────────── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Disease overview card */}
                <div
                  className="rounded-2xl border p-7"
                  style={{ backgroundColor: '#fff', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-md)' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h2 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
                        {disease.disease}
                      </h2>
                      <p className="text-sm italic" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-sans)' }}>
                        {disease.pathogen} · Affects: {disease.crop}
                      </p>
                    </div>
                    <span
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border flex-shrink-0"
                      style={{ backgroundColor: sev.bg, borderColor: sev.border, color: sev.text, fontFamily: 'var(--font-sans)' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sev.dot }} />
                      {disease.severity} Severity
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
                    {disease.overview}
                  </p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>
                      Key Symptoms
                    </p>
                    <ul className="space-y-1.5">
                      {disease.symptoms.map(s => (
                        <li key={s} className="flex items-center gap-2 text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
                          <AlertCircle size={13} style={{ color: 'var(--forest-500)', flexShrink: 0 }} />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Accordion sections */}
                {[
                  {
                    key: 'prevention',
                    label: 'Preventive Measures',
                    icon: '🛡️',
                    items: disease.prevention,
                  },
                  {
                    key: 'treatment',
                    label: 'Treatment Protocol',
                    icon: '💊',
                    items: disease.treatment,
                  },
                  {
                    key: 'organic',
                    label: 'Organic / Biological Options',
                    icon: '🌿',
                    items: disease.organicOptions,
                  },
                ].map(({ key, label, icon, items }) => {
                  const isOpen = openSection === key;
                  return (
                    <div
                      key={key}
                      className="rounded-2xl border overflow-hidden"
                      style={{ backgroundColor: '#fff', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-sm)' }}
                    >
                      <button
                        type="button"
                        id={`accordion-${key}`}
                        onClick={() => setOpenSection(isOpen ? null : key)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{icon}</span>
                          <span className="font-semibold text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'var(--neutral-800)' }}>
                            {label}
                          </span>
                        </div>
                        <ChevronDown
                          size={16}
                          className="transition-transform"
                          style={{ color: 'var(--neutral-400)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-5">
                              <div className="pt-0 border-t" style={{ borderColor: 'var(--mint-100)' }} />
                              <ul className="space-y-3 mt-4">
                                {items.map(item => (
                                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
                                    <CheckCircle2 size={14} style={{ color: 'var(--forest-500)', marginTop: 2, flexShrink: 0 }} />{item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
