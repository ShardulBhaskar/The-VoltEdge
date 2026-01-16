import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  Grid3x3, 
  Table,
  Ampersands,
  Binary, 
  Search, 
} from 'lucide-react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const tools = [
    {
      id: 'kmap',
      title: 'K-Map Solver',
      desc: 'Simplify boolean expressions with SOP and POS methods.',
      icon: <Grid3x3 className="w-8 h-8 text-blue-600" />,
      tag: 'Logic',
      path: '/kmap'
    },
    {
      id: 'truthtable',
      title: 'Truth Table Generator',
      desc: 'Generate tables from boolean expressions.',
      icon: <Table className="w-8 h-8 text-emerald-600" />,
      tag: 'Logic',
      path: '/truthtable'
    },
    {
      id: 'converter',
      title: 'Base Converter',
      desc: 'Hex, Binary, Decimal, Octal translator.',
      icon: <Binary className="w-8 h-8 text-orange-600" />,
      tag: 'Math',
      path: '/converter'
    },
    {
      id: 'gates',
      title: 'Logic Gates Minimizer',
      desc: "Solve and understand basic logic gates.",
      icon: <Ampersands className="w-8 h-8 text-red-600" />,
      tag: 'Circuits',
      path: '/gates'
    },
    {
        id: '1',
        title: 'Resistor Color Code Calculator',
        desc: 'Calculate resistance values based on color bands.',
        icon: <Grid3x3 className="w-8 h-8 text-yellow-600" />,
        tag: 'Components',
        path: '/resistor'
    },
    {
        id: '2',
        title: 'Logic Gate Simulator',
        desc: 'Simulate and visualize logic gate operations.',
        icon: <Ampersands className="w-8 h-8 text-purple-600" />,
        path: '/gatessimulator',
    }
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
        <div className="relative text-center mb-8 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight pt-12">
            Your Digital Electronics Companion
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Instant tools for digital logic, conversions, etc. for electronics students
          </p>
        </div>

        <div className="max-w-md mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              className="group bg-white rounded-xl border border-slate-200 p-4 md:p-6 hover:shadow-lg hover:border-neutral-800 transition-all duration-200 cursor-pointer flex flex-col justify-between md:min-h-48"
              onClick={() => navigate(tool.path)}
            >
              <div className='flex md:flex-col gap-4 items-center'>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    {tool.icon}
                  </div>
                </div>
                <div className='flex flex-col'>
                <h3 className="text-md font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[12px] text-slate-500">
                  {tool.desc}
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  )
}

export default Home
