import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, AlertTriangle, ShoppingCart } from 'lucide-react';
import { mockMarketPrices, cropFilterOptions, marketFilterOptions } from '../data/mockData';
import ScrollReveal from '../components/ScrollReveal';

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendStyle = {
  up:     { color: '#16a34a', bg: '#dcfce7' },
  down:   { color: '#dc2626', bg: '#fee2e2' },
  stable: { color: '#6b7280', bg: '#f3f4f6' },
};

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter]   = useState('All Crops');
  const [marketFilter, setMarketFilter] = useState('All Markets');
  const [sortKey, setSortKey]         = useState('crop');
  const [sortDir, setSortDir]         = useState('asc');

  const { entries } = mockMarketPrices;

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    let rows = [...entries];
    if (cropFilter !== 'All Crops') rows = rows.filter(r => r.crop === cropFilter);
    if (marketFilter !== 'All Markets') rows = rows.filter(r => r.market === marketFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(r => r.crop.toLowerCase().includes(q) || r.market.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase(), bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [entries, cropFilter, marketFilter, searchQuery, sortKey, sortDir]);

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronUp size={12} style={{ opacity: 0.3 }} />;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--mint-50)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
            style={{ backgroundColor: 'var(--mint-100)', borderColor: 'var(--mint-200)', color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}
          >
            <ShoppingCart size={12} /> Market Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--neutral-900)' }}>
            Crop Market Prices
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>
            Track regional market prices and price trends to make informed selling decisions.
          </p>
          <div
            className="flex items-center gap-2 mt-4 text-xs px-3 py-2 rounded-lg border inline-flex"
            style={{ backgroundColor: '#fef3c7', borderColor: '#fde68a', color: '#92400e', fontFamily: 'var(--font-sans)' }}
          >
            <AlertTriangle size={12} />
            <span><strong>Demo Mode:</strong> Showing illustrative sample data as of {mockMarketPrices.lastUpdated}. Connect to a market API for live prices.</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 space-y-6">
        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--neutral-400)' }} />
              <input
                id="market-search"
                type="text"
                placeholder="Search crop or market…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm bg-white"
                style={{ borderColor: 'var(--mint-200)', fontFamily: 'var(--font-sans)', outline: 'none', boxShadow: 'var(--shadow-sm)' }}
              />
            </div>

            {/* Crop filter */}
            <div className="relative">
              <select
                id="crop-filter"
                value={cropFilter}
                onChange={e => setCropFilter(e.target.value)}
                className="appearance-none pl-4 pr-8 py-3 rounded-xl border text-sm bg-white"
                style={{ borderColor: 'var(--mint-200)', fontFamily: 'var(--font-sans)', outline: 'none', boxShadow: 'var(--shadow-sm)', color: 'var(--neutral-700)' }}
              >
                {cropFilterOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--neutral-400)' }} />
            </div>

            {/* Market filter */}
            <div className="relative">
              <select
                id="market-filter"
                value={marketFilter}
                onChange={e => setMarketFilter(e.target.value)}
                className="appearance-none pl-4 pr-8 py-3 rounded-xl border text-sm bg-white"
                style={{ borderColor: 'var(--mint-200)', fontFamily: 'var(--font-sans)', outline: 'none', boxShadow: 'var(--shadow-sm)', color: 'var(--neutral-700)' }}
              >
                {marketFilterOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--neutral-400)' }} />
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <p className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>
          Showing {filtered.length} of {entries.length} listings · Currency: {mockMarketPrices.currency}
        </p>

        {/* Table */}
        <ScrollReveal delay={0.1}>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: '#fff', borderColor: 'var(--mint-200)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: 'var(--mint-50)', borderBottom: '1px solid var(--mint-200)' }}>
                    {[
                      { key: 'crop', label: 'Crop' },
                      { key: 'market', label: 'Market' },
                      { key: 'price', label: `Price (${mockMarketPrices.currency})` },
                      { key: null, label: 'Unit' },
                      { key: 'date', label: 'Date' },
                      { key: 'trend', label: 'Trend' },
                    ].map(({ key, label }) => (
                      <th
                        key={label}
                        className={`text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider ${key ? 'cursor-pointer select-none hover:text-neutral-800' : ''}`}
                        style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}
                        onClick={key ? () => toggleSort(key) : undefined}
                      >
                        <span className="flex items-center gap-1.5">
                          {label}
                          {key && <SortIcon col={key} />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-sans)' }}>
                          No results match your search and filters.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((row, i) => {
                        const TIcon = trendIcon[row.trend];
                        const ts = trendStyle[row.trend];
                        return (
                          <motion.tr
                            key={row.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="border-b transition-colors"
                            style={{ borderColor: 'var(--mint-100)' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--mint-50)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <td className="px-5 py-4 font-semibold" style={{ color: 'var(--neutral-800)', fontFamily: 'var(--font-sans)' }}>{row.crop}</td>
                            <td className="px-5 py-4" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-sans)' }}>{row.market}</td>
                            <td className="px-5 py-4 font-bold" style={{ color: 'var(--forest-600)', fontFamily: 'var(--font-sans)' }}>
                              {row.price.toLocaleString()}
                            </td>
                            <td className="px-5 py-4 text-xs" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-sans)' }}>{row.unit}</td>
                            <td className="px-5 py-4 text-xs" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-sans)' }}>{row.date}</td>
                            <td className="px-5 py-4">
                              <span
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                                style={{ backgroundColor: ts.bg, color: ts.color, fontFamily: 'var(--font-sans)' }}
                              >
                                <TIcon size={11} />
                                {row.change}
                              </span>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
