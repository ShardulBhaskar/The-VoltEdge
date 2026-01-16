import React, { useEffect } from 'react';
import { useState } from 'react';
import { GridBox } from '../components/kmap/GridBox';
import { Grid, Grid3x3 } from 'lucide-react';
import { solveKMap4 } from "../components/kmap/logic.js";


const KMapSolver = () => {
  const [grid, setGrid] = useState(Array(16).fill(0));
  const [solutionGroups, setSolutionGroups] = useState([]);
  const [expression, setExpression] = useState('');
  const toggleCell = (idx) => {
    setGrid(prev => {
      const next = [...prev];
      next[idx] = next[idx] === 0 ? 1 : next[idx] === 1 ? 'X' : 0;
      return next;
    });
  }

  function handleSolve() {
    const { groups, expression } = solveKMap4(grid);
    setSolutionGroups(groups);
    setExpression(expression);
    console.log("Groups:", groups);
    console.log("Expression:", expression);
  }
  
  useEffect(() => {
    handleSolve(grid);
  }, [grid]);

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-2 min-h-[60vh] mt-2">
      <div className="flex items-center gap-4 p-4 w-full justify-center">
        <div className="rounded-xl">
           <Grid3x3 className="w-8 h-8 text-blue-600" />
        </div>
        <div>
           <h1 className="text-sm md:text-3xl font-bold text-slate-900">K-Map Solver</h1>
           <p className="text-[12px] md:text-lg text-slate-500">Simplify boolean expressions with SOP and POS methods.</p>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 w-full">
        
        <div className='grid grid-cols-5 grid-rows-5 gap-0.5 w-[240px] h-[240px] mx-auto relative'>
          
          <div className='text-[10px] flex justify-center items-end -rotate-45'> AB \ CD</div>
          <div className='text-[10px] flex justify-center items-end'>00</div>
          <div className='text-[10px] flex justify-center items-end'>01</div>
          <div className='text-[10px] flex justify-center items-end'>11</div>
          <div className='text-[10px] flex justify-center items-end'>10</div>
          <div className='text-[10px] flex justify-end items-center'>00</div>
          <GridBox value={grid[0]} index={0} onClick={() => toggleCell(0)} />
          <GridBox value={grid[1]} index={1} onClick={() => toggleCell(1)} />
          <GridBox value={grid[3]} index={3} onClick={() => toggleCell(3)} />
          <GridBox value={grid[2]} index={2} onClick={() => toggleCell(2)} />
          <div className='text-[10px] flex justify-end items-center'>01</div>
          <GridBox value={grid[4]} index={4} onClick={() => toggleCell(4)} />
          <GridBox value={grid[5]} index={5} onClick={() => toggleCell(5)} />
          <GridBox value={grid[7]} index={7} onClick={() => toggleCell(7)} />
          <GridBox value={grid[6]} index={6} onClick={() => toggleCell(6)} />
          <div className='text-[10px] flex justify-end items-center'>11</div>
          <GridBox value={grid[12]} index={12} onClick={() => toggleCell(12)} />
          <GridBox value={grid[13]} index={13} onClick={() => toggleCell(13)} />
          <GridBox value={grid[15]} index={15} onClick={() => toggleCell(15)} />
          <GridBox value={grid[14]} index={14} onClick={() => toggleCell(14)} />
          <div className='text-[10px] flex justify-end items-center'>10</div>
          <GridBox value={grid[8]} index={8} onClick={() => toggleCell(8)} />
          <GridBox value={grid[9]} index={9} onClick={() => toggleCell(9)} />
          <GridBox value={grid[11]} index={11} onClick={() => toggleCell(11)} />
          <GridBox value={grid[10]} index={10} onClick={() => toggleCell(10)} />
        </div>
        <div className='mt-4 w-1/2 flex justify-center gap-2'>
          <p className="text-md md:text-lg font-semibold">Simplified Expression:</p>
          <p className="text-md md:text-lg font-semibold text-blue-700">{expression}</p>
        </div>
        <div className='flex justify-center flex-col items-center'>
          <div className='text-md text-neutral-500'>How to use?</div>
          <div className='text-sm text-neutral-400 max-w-md text-center'>
            Click on the K-map cells to toggle between 0, 1, and don't care (X). The simplified boolean expression will be updated automatically.
          </div>
        </div>
      </div>
    </div>
  );
};

export default KMapSolver;
