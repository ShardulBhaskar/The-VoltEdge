import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap, Github } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/ShardulBhaskar/The-VoltEdge')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
           // Format formatting for > 1000 stars if needed, e.g. 1.2k
           setStarCount(data.stargazers_count);
        }
      })
      .catch(err => console.error("Failed to fetch github stars", err));
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-[95%] md:max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl md:rounded-full px-4 py-3 md:px-6 md:py-3 flex justify-between items-center transition-all duration-300">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
           <div className="p-2 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-slate-900/20">
              <Zap size={18} className="text-white fill-white" />
           </div>
           <span className="font-bold text-lg text-slate-900 tracking-tight">VoltEdge</span>
        </Link>

        <div className="flex items-center gap-3">
            {/* Desktop Links - Pill Style */}
            <div className="hidden md:flex items-center gap-2">
                {[
                  { name: 'Tools', path: '/' },
                  { name: 'Blogs', path: '/blog' },
                  { name: 'About', path: '/about' },
                  { name: 'Contact', path: '/contact' }
                ].map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
            </div>

            {/* GitHub Star Button */}
            <a 
              href="https://github.com/ShardulBhaskar/The-VoltEdge" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded-sm duration-200 text-sm md:text-lg font-medium transition-colors shadow-md hover:shadow-sm shadow-slate-900/20"
            >
              <Github size={16} color='black' />
              
              {starCount !== null && (
                <span className="flex items-center gap-1 rounded-md text-sm">
                   {starCount}
                </span>
              )}
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2.5 text-slate-900 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors border border-slate-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex flex-col gap-1 animate-in slide-in-from-top-2 fade-in duration-200 origin-top-right">
           {['Tools', 'About', 'Contact'].map((item) => (
             <div key={item} className="px-4 py-3 hover:bg-slate-50 rounded-xl font-medium text-sm text-slate-600 cursor-pointer transition-colors text-left">
                {item}
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
