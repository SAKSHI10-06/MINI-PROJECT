import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Eye, ChevronDown, RefreshCw, AlertTriangle, Sun } from 'lucide-react';
import { mockWeatherData, kenyanLocations } from '../data/mockData';
import ScrollReveal from '../components/ScrollReveal';

const insightColors = {
  info:    { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
  success: { bg: '#dcfce7', border: '#bbf7d0', text: '#15803d' },
  warning: { bg: '#fef3c7', border: '#fde68a', text: '#92400e' },
  error:   { bg: '#fee2e2', border: '#fecaca', text: '#991b1b' },
};

export default function WeatherPage() {
  const [location, setLocation] = useState('Nairobi');
  const [loading, setLoading]   = useState(false);
  const [data, setData]         = useState(mockWeatherData);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // In production: fetch from weather API
    setData({ ...mockWeatherData, location });
    setLoading(false);
  };

  const handleLocationChange = async (e) => {
    const loc = e.target.value;
    setLocation(loc);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setData({ ...mockWeatherData, location: loc + ', Kenya' });
    setLoading(false);
  };

  const c = data.current;

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--mint-50)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
            style={{ backgroundColor: 'var(--mint-100)', borderColor: 'var(--mint-200)', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
          >
            <Sun size={12} /> Weather Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
            Farming Weather Insights
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
            Hyper-local weather forecasts with advisories tailored for agricultural planning.
          </p>
          <div
            className="flex items-center gap-2 mt-4 text-xs px-3 py-2 rounded-lg border inline-flex"
            style={{ backgroundColor: '#fef3c7', borderColor: '#fde68a', color: '#92400e', fontFamily: 'var(--font-sans)' }}
          >
            <AlertTriangle size={12} />
            <span><strong>Demo Mode:</strong> Showing illustrative sample data. Connect a weather API for live data.</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 space-y-8">
        {/* Location selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        >
          <div className="relative flex-1 max-w-xs">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--forest-500)' }} />
            <select
              id="location-select"
              value={location}
              onChange={handleLocationChange}
              className="w-full appearance-none pl-9 pr-8 py-3 rounded-xl border text-sm bg-white"
              style={{ borderColor: 'var(--mint-200)', color: 'var(--neutral-800)', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-sm)', outline: 'none' }}
            >
              {kenyanLocations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--neutral-400)' }} />
          </div>
          <button
            id="refresh-weather-btn"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200"
            style={{ borderColor: 'var(--forest-500)', color: 'var(--forest-500)', fontFamily: 'var(--font-sans)', backgroundColor: '#fff' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--forest-500)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = 'var(--forest-500)'; }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin-slow' : ''} />
            {loading ? 'Updating…' : 'Refresh'}
          </button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin-slow" style={{ borderColor: 'var(--mint-200)', borderTopColor: 'var(--forest-500)' }} />
          </div>
        ) : (
          <>
            {/* Current conditions */}
            <ScrollReveal>
              <div
                className="rounded-3xl border p-8"
                style={{ backgroundColor: '#fff', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} style={{ color: 'var(--forest-500)' }} />
                      <span className="text-sm font-medium" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>{data.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-6xl">{c.icon}</span>
                      <div>
                        <p className="text-5xl font-light" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>{c.temperature}°C</p>
                        <p className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>Feels like {c.feelsLike}°C · {c.condition}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    {[
                      { Icon: Droplets, label: 'Humidity', value: `${c.humidity}%` },
                      { Icon: Wind, label: 'Wind', value: `${c.windSpeed} km/h ${c.windDirection}` },
                      { Icon: Eye, label: 'Visibility', value: `${c.visibility} km` },
                      { Icon: Sun, label: 'UV Index', value: c.uvIndex },
                    ].map(({ Icon, label, value }) => (
                      <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--mint-50)' }}>
                        <Icon size={16} className="mx-auto mb-1" style={{ color: 'var(--forest-500)' }} />
                        <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--neutral-800)' }}>{value}</p>
                        <p className="text-xs" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-sans)' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5-day forecast */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>5-Day Forecast</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {data.forecast.map(({ day, high, low, icon: fIcon, condition, rainfall }) => (
                      <div key={day} className="text-center p-3 rounded-xl border" style={{ borderColor: 'var(--mint-100)', backgroundColor: 'var(--mint-50)' }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>{day.slice(0, 3)}</p>
                        <p className="text-2xl mb-1">{fIcon}</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--neutral-800)', fontFamily: 'var(--font-sans)' }}>{high}°</p>
                        <p className="text-xs" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-sans)' }}>{low}°</p>
                        {rainfall > 0 && <p className="text-xs mt-1" style={{ color: '#3b82f6', fontFamily: 'var(--font-sans)' }}>{rainfall}mm</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Farming Insights */}
            <ScrollReveal delay={0.1}>
              <h2 className="text-2xl mb-5" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
                Farming Advisories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.farmingInsights.map(({ icon, title, message, type }, i) => {
                  const style = insightColors[type];
                  return (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-xl border p-5 flex gap-4"
                      style={{ backgroundColor: style.bg, borderColor: style.border }}
                    >
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <p className="font-semibold text-sm mb-1" style={{ color: style.text, fontFamily: 'var(--font-sans)' }}>{title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: style.text, opacity: 0.85, fontFamily: 'var(--font-sans)' }}>{message}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </div>
  );
}
