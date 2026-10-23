import { Leaf, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav page-shell" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="AgriGrade home">
          <span className="brand__mark"><Leaf size={18} /></span>
          <span>Agri<span>Grade</span></span>
        </Link>
        <div className="site-nav__links">
          <Link to="/#how-it-works">How it works</Link>
          <Link className="site-nav__cta" to="/#analyze">Check a crop <MoveUpRight size={15} /></Link>
        </div>
      </nav>
    </header>
  );
}
