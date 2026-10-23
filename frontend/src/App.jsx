
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document
          .getElementById(
            decodeURIComponent(location.hash.slice(1)),
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });

      return;
    }

    if (location.pathname === '/analyze') {
      requestAnimationFrame(() => {
        document
          .getElementById('analyze')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname, location.hash]);

  return null;
}

function AppContent() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const location = useLocation();

  return (
    <>
      <RouteEffects />

      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              ease: 'easeOut',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onAnalysisComplete={setAnalysisResult}
                  />
                }
              />

              <Route
                path="/analyze"
                element={
                  <HomePage
                    onAnalysisComplete={setAnalysisResult}
                  />
                }
              />

              <Route
                path="/results"
                element={
                  <ResultsPage
                    analysisResult={analysisResult}
                  />
                }
              />

              <Route
                path="*"
                element={
                  <HomePage
                    onAnalysisComplete={setAnalysisResult}
                  />
                }
              />
            </Routes>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
