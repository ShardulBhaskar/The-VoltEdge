import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 border-b border-slate-200 bg-white/80 backdrop-blur-[10px] z-50 left-0 w-full px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="" alt="Logo" className='w-6 h-6 border border-black rounded-full' />
          <span className="font-bold text-md md:text-xl tracking-tight text-slate-900">The VoltEdge</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex gap-8'>
          <div className="text-[12px] md:text-md font-medium text-slate-500 hover:text-blue-600 cursor-pointer">
            About
          </div>
          <div className="text-[12px] md:text-md font-medium text-slate-500 hover:text-blue-600 cursor-pointer">
            Contact Us
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <div className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer py-2 border-b border-slate-100">
            About
          </div>
          <div className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer py-2">
            Contact Us
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
