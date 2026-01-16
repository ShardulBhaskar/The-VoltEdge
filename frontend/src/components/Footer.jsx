import React, { useState } from 'react';
import { CircuitBoard, Github, Twitter, Linkedin, Mail, ChevronDown } from 'lucide-react';

const FooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 md:border-none pb-4 md:pb-0">
      <button 
        className="flex items-center justify-between w-full md:w-auto md:cursor-default py-2 md:py-0 text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-slate-900 mb-0 md:mb-4">{title}</h3>
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 md:hidden transition-transform duration-200 group-hover:text-slate-600 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:h-auto ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-none md:mt-0'}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 border-b-2 border-slate-100 md:border-none">
            <div className="flex items-center gap-2 mb-2">
              <CircuitBoard className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl text-slate-800">The-VoltEdge</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed md:mb-6">
              Empowering engineers and students with powerful digital logic simulation and analysis tools.
            </p>
            <div className="flex gap-4 mb-2">
              <a href="https://github.com/ShardulBhaskar/The-VoltEdge" className="flex justify-center items-center border border-slate-400 p-1 bg-slate-50 rounded-md hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5 inline" /> <p className="ml-2">GitHub</p>
              </a>
            </div>
          </div>

          {/* Tools Links */}
          <FooterSection title="Tools">
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="/k-map-solver" className="hover:text-blue-600 transition-colors">K-Map Solver</a></li>
              <li><a href="/truth-table" className="hover:text-blue-600 transition-colors">Truth Table Generator</a></li>
              <li><a href="/gate-simulator" className="hover:text-blue-600 transition-colors">Logic Gate Simulator</a></li>
              <li><a href="/base-converter" className="hover:text-blue-600 transition-colors">Base Converter</a></li>
            </ul>
          </FooterSection>

          {/* Resources Links */}
          <FooterSection title="Resources">
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Boolean Algebra Guide</a></li>
            </ul>
          </FooterSection>

          {/* Contact */}
          <FooterSection title="Contact">
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <p>Shardul Bhaskar</p>
              </li>
              <li>
                <p>Anas Dharar</p>
              </li>
              <li>
                <p>Designed for students and professionals.</p>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} The-VoltEdge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
