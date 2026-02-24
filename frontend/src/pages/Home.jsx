import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Grid3x3,
  Table,
  Ampersands,
  Binary,
  Search,
  Cpu,
  ArrowRight,
  Zap
} from 'lucide-react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const tools = [
    {
      id: 'kmap',
      title: 'K-Map Solver',
      desc: 'Simplify boolean expressions using Karnaugh maps with SOP and POS support.',
      icon: <Grid3x3 className="w-8 h-8 text-blue-600" />,
      tag: 'Logic',
      path: '/kmap'
    },
    {
      id: 'truthtable',
      title: 'Truth Table Generator',
      desc: 'Generate complete truth tables instantly from any boolean expression.',
      icon: <Table className="w-8 h-8 text-emerald-600" />,
      tag: 'Logic',
      path: '/truthtable'
    },
    {
      id: 'converter',
      title: 'Base Converter',
      desc: 'Seamlessly translate between Hex, Binary, Decimal, and Octal formats.',
      icon: <Binary className="w-8 h-8 text-orange-600" />,
      tag: 'Math',
      path: '/converter'
    },
    {
      id: '1',
      title: 'Resistor Calculator',
      desc: 'Calculate resistance values with precision based on color bands.',
      icon: <Grid3x3 className="w-8 h-8 text-yellow-600" />,
      tag: 'Components',
      path: '/resistor'
    },
    {
      id: 'gates',
      title: 'Logic Gates Minimizer',
      desc: "Analyze and minimize basic logic gate circuits for efficiency.",
      icon: <Ampersands className="w-8 h-8 text-red-600" />,
      tag: 'soon',
      path: '/gates'
    },

    {
      id: '2',
      title: 'Logic Gate Simulator',
      desc: 'Interactive simulator to visualize and test your logic gate designs.',
      icon: <Ampersands className="w-8 h-8 text-purple-600" />,
      tag: 'soon',
      path: '/gatessimulator',
    }
  ];

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-8 max-w-6xl mx-auto px-4">

      {/* Hero Section */}
      <div className="text-center mb-20 md:mb-18">

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Your Digital Electronics Companion
        </h1>
        <p className="text-slate-500 text-lg font-medium mb-6">
          Instant tools for electronics students, professionals and enthusiasts.
        </p>
        <div id="tools-section" className="max-w-xl mx-auto relative group z-20">
          <div className="relative flex items-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <Search className="ml-4 h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              className="w-full pl-3 pr-4 py-3 bg-transparent outline-none text-slate-700 placeholder-slate-500 text-base"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className={`group bg-white rounded-3xl border border-slate-200 p-6 ${tool.tag !== 'soon' ? 'hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:border-slate-900 hover:-translate-y-1' : 'hover:cursor-not-allowed'} transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden`}
            onClick={tool.tag !== 'soon' ? () => navigate(tool.path) : undefined}
          >
            <div className={`flex gap-5 items-center z-10 relative ${tool.tag === 'soon' ? 'grayscale' : ''}`}>
              <div className="shrink-0">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors duration-300">
                  {tool.icon}
                </div>
              </div>
              <div className='flex flex-col text-left'>
                <h3 className="text-xl font-bold text-slate-900 transition-colors mb-2 tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {tool.desc}
                </p>
                {tool.tag === 'soon' && (
                  <span className="mt-3 inline-block w-fit px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                    Coming Soon
                  </span>)
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Home
