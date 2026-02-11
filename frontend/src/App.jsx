import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import KMapSolver from './pages/KMapSolver';
import TruthTableGenerator from './pages/TruthTableGenerator';
import BaseConverter from './pages/BaseConverter';
import LogicGatesMinimizer from './pages/LogicGatesMinimizer';
import ResistorColorCodeCalculator from './pages/ResistorColorCode';
import LogicGateSimulator from './pages/GateSimulator';
import Blog from './pages/Blog';
import NumberingAndCodingSystems from './pages/blogs/NumberingAndCodingSystems';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/numbering-and-coding-systems" element={<NumberingAndCodingSystems />} />
          <Route path="/about" element={<About />} />
          <Route path="/kmap" element={<KMapSolver />} />
          <Route path="/truthtable" element={<TruthTableGenerator />} />
          <Route path="/converter" element={<BaseConverter />} />
          <Route path="/gates" element={<LogicGatesMinimizer />} />
          <Route path="/resistor" element={<ResistorColorCodeCalculator />} />
          <Route path="/gatessimulator" element={<LogicGateSimulator />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
