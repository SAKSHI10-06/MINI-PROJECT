import { Leaf, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand brand--footer">
              <span className="brand__mark"><Leaf size={18} /></span>
              <span>Agri<span>Grade</span></span>
            </Link>
            <p>Clearer crop insights for healthier harvests. Designed to make a useful first check feel simple.</p>
          </div>
          <div className="footer-nav">
            <span className="footer-label">EXPLORE</span>
            <Link to="/#analyze">Crop check</Link>
            <Link to="/#how-it-works">How it works</Link>
          </div>
          <div className="footer-contact">
            <span className="footer-label">GET IN TOUCH</span>
            <a href="mailto:hello@agrigrade.io"><Mail size={15} /> hello@agrigrade.io</a>
            <span><MapPin size={15} /> Built for growers, everywhere</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AgriGrade</span>
          <span>Demo assessments are illustrative, not a substitute for professional agronomic advice.</span>
        </div>
      </div>
    </footer>
  );
}
