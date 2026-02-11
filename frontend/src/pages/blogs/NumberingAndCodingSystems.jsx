import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';

const NumberingAndCodingSystems = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link 
        to="/blog" 
        className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blogs
      </Link>

      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Digital Electronics
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Numbering and Coding Systems
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Fundamentals</span>
            </div>
          </div>
        </header>


        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
             <p className="text-xl leading-relaxed text-slate-700">
                We usually use base 10 (decimal) in our day-to-day life. However, computers use base 2 (binary) system. There are other convenient methods for representation of binary numbers called Hexadecimal number system and Octal number systems.
             </p>
          </div>

          <h3>System Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse my-4">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-4 border-b border-slate-200">System</th>
                  <th className="p-4 border-b border-slate-200">Base/Radix</th>
                  <th className="p-4 border-b border-slate-200">Representation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold text-blue-600">Binary</td>
                  <td className="p-4 border-b border-slate-100">2</td>
                  <td className="p-4 border-b border-slate-100 font-mono text-sm">0, 1 (bits)</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold text-emerald-600">Decimal</td>
                  <td className="p-4 border-b border-slate-100">10</td>
                  <td className="p-4 border-b border-slate-100 font-mono text-sm">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold text-purple-600">Hexadecimal</td>
                  <td className="p-4 border-b border-slate-100">16</td>
                  <td className="p-4 border-b border-slate-100 font-mono text-sm">0-9, A, B, C, D, E, F</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold text-orange-600">Octal</td>
                  <td className="p-4 border-b border-slate-100">8</td>
                  <td className="p-4 border-b border-slate-100 font-mono text-sm">0, 1, 2, 3, 4, 5, 6, 7</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Number Systems Comparison</h3>
           <div className="overflow-x-auto max-h-[500px] border rounded-lg border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="p-3 border-b text-sm font-semibold text-slate-600">Binary</th>
                  <th className="p-3 border-b text-sm font-semibold text-slate-600">Decimal</th>
                  <th className="p-3 border-b text-sm font-semibold text-slate-600">Hexadecimal</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {[
                    ['0000', '0', '0'], ['0001', '1', '1'], ['0010', '2', '2'], ['0011', '3', '3'],
                    ['0100', '4', '4'], ['0101', '5', '5'], ['0110', '6', '6'], ['0111', '7', '7'],
                    ['1000', '8', '8'], ['1001', '9', '9'], ['1010', '10', 'A'], ['1011', '11', 'B'],
                    ['1100', '12', 'C'], ['1101', '13', 'D'], ['1110', '14', 'E'], ['1111', '15', 'F'],
                    ['10000', '16', '10'], ['10001', '17', '11'], ['10010', '18', '12']
                ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-3 border-b border-slate-100">{row[0]}</td>
                        <td className="p-3 border-b border-slate-100">{row[1]}</td>
                        <td className="p-3 border-b border-slate-100">{row[2]}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 border-b pb-4">Conversion Methods</h2>

          {/* Decimal to Binary */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Decimal to Binary</h3>
            <p className="mb-4">Divide the number by 2, until quotient becomes 0 and then write the remainders in reverse order (from MSB to LSB).</p>
            <div className="bg-slate-900 text-slate-50 p-6 rounded-lg font-mono text-sm shadow-lg">
                <p className="text-slate-400 mb-2">// Example: Convert 25 to Binary</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2">
                    <span>25 ÷ 2 = 12</span> <span className="text-green-400">remainder 1 (LSB)</span>
                    <span>12 ÷ 2 = 6</span> <span className="text-green-400">remainder 0</span>
                    <span>6 ÷ 2 = 3</span> <span className="text-green-400">remainder 0</span>
                    <span>3 ÷ 2 = 1</span> <span className="text-green-400">remainder 1</span>
                    <span>1 ÷ 2 = 0</span> <span className="text-green-400">remainder 1 (MSB)</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 text-lg">
                    Result: <span className="text-blue-400">11001₂</span>
                </div>
            </div>
          </div>

          {/* Decimal to Octal */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Decimal to Octal</h3>
            <p className="mb-4">Divide the number by 8, until quotient becomes 0 and then write the remainders in reverse order.</p>
            <div className="bg-slate-900 text-slate-50 p-6 rounded-lg font-mono text-sm shadow-lg">
                <p className="text-slate-400 mb-2">// Example: Convert 128 to Octal</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2">
                    <span>128 ÷ 8 = 16</span> <span className="text-green-400">remainder 0 (LSB)</span>
                    <span>16 ÷ 8 = 2</span> <span className="text-green-400">remainder 0</span>
                    <span>2 ÷ 8 = 0</span> <span className="text-green-400">remainder 2 (MSB)</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 text-lg">
                    Result: <span className="text-orange-400">200₈</span>
                </div>
            </div>
          </div>

          {/* Decimal to Hex */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Decimal to Hexadecimal</h3>
            <p className="mb-4">Divide the number by 16, until quotient becomes 0 and then write the remainders in reverse order.</p>
            <div className="bg-slate-900 text-slate-50 p-6 rounded-lg font-mono text-sm shadow-lg">
                <p className="text-slate-400 mb-2">// Example: Convert 128 to Hex</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2">
                    <span>128 ÷ 16 = 8</span> <span className="text-green-400">remainder 0 (LSB)</span>
                    <span>8 ÷ 16 = 0</span> <span className="text-green-400">remainder 8 (MSB)</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 text-lg">
                    Result: <span className="text-purple-400">80₁₆</span>
                </div>
            </div>
          </div>

          {/* Binary to Decimal */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Binary to Decimal</h3>
            <p className="mb-4">Multiply each binary digit by 2ⁿ, where n is the position of the digit from right to left (starting at 0) and sum the results.</p>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <p className="font-mono text-lg mb-4">11001₂ = ?</p>
                <ul className="space-y-2 font-mono text-sm text-slate-600">
                    <li>1 × 2⁰ = 1</li>
                    <li>0 × 2¹ = 0</li>
                    <li>0 × 2² = 0</li>
                    <li>1 × 2³ = 8</li>
                    <li>1 × 2⁴ = 16</li>
                </ul>
                <p className="mt-4 font-bold text-lg text-slate-900 border-t pt-2">
                    Sum: 1 + 0 + 0 + 8 + 16 = <span className="text-blue-600">25₁₀</span>
                </p>
            </div>
          </div>

          {/* Grouping Conversions */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
             <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h4 className="font-bold text-orange-800 mb-3 block">Binary to Octal</h4>
                <p className="text-sm text-orange-700 mb-4">Group binary digits into sets of <strong>three</strong> from right to left.</p>
                <div className="font-mono bg-white p-4 rounded border border-orange-200">
                    <div className="mb-2 text-slate-500">11001₂ → (Grouping by 3)</div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <div className="border-b border-slate-300 mb-1">011</div>
                            <div className="font-bold">3</div>
                        </div>
                        <div className="text-center">
                             <div className="border-b border-slate-300 mb-1">001</div>
                             <div className="font-bold">1</div>
                        </div>
                    </div>
                    <div className="mt-2 text-right font-bold text-orange-600">= 31₈</div>
                </div>
             </div>

             <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-800 mb-3 block">Binary to Hexadecimal</h4>
                <p className="text-sm text-purple-700 mb-4">Group binary digits into sets of <strong>four</strong> from right to left.</p>
                <div className="font-mono bg-white p-4 rounded border border-purple-200">
                    <div className="mb-2 text-slate-500">11001₂ → (Grouping by 4)</div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <div className="border-b border-slate-300 mb-1">0001</div>
                            <div className="font-bold">1</div>
                        </div>
                        <div className="text-center">
                             <div className="border-b border-slate-300 mb-1">1001</div>
                             <div className="font-bold">9</div>
                        </div>
                    </div>
                    <div className="mt-2 text-right font-bold text-purple-600">= 19₁₆</div>
                </div>
             </div>
          </div>

          {/* Other Conversions */}
          <div className="space-y-8">
            <div>
                <h3 className="font-bold text-xl mb-2">Octal to Binary</h3>
                <p className="text-slate-600 mb-4">Each octal digit maps exactly to a 3-bit binary equivalent.</p>
                <div className="p-4 bg-slate-50 rounded-lg font-mono">
                    <p className="mb-2">153₈ = ?</p>
                    <div className="flex gap-8">
                        <div>1 → 001</div>
                        <div>5 → 101</div>
                        <div>3 → 011</div>
                    </div>
                    <p className="mt-2 font-bold text-blue-600">Result: 001101011₂</p>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-2">Hexadecimal to Binary</h3>
                <p className="text-slate-600 mb-4">Each hex digit corresponds to a fixed 4-bit binary value.</p>
                <div className="p-4 bg-slate-50 rounded-lg font-mono">
                    <p className="mb-2">2F₁₆ = ?</p>
                    <div className="flex gap-8">
                        <div>2 → 0010</div>
                        <div>F → 1111</div>
                    </div>
                    <p className="mt-2 font-bold text-blue-600">Result: 00101111₂</p>
                </div>
            </div>

             <div>
                <h3 className="font-bold text-xl mb-2">Hexadecimal to Decimal</h3>
                <p className="text-slate-600 mb-4">Convert Hex to Binary, then Binary to Decimal (or multiply digits by 16ⁿ).</p>
                <div className="p-4 bg-slate-50 rounded-lg font-mono">
                    <p className="mb-2">6B2₁₆ → 0110 1011 0010₂</p>
                    <p className="mt-2 font-bold text-blue-600">Result: 1714₁₀</p>
                </div>
            </div>
          </div>




          <h3>Conclusion</h3>
          <p>
            Mastering these systems allows us to bridge the gap between human logic and machine execution. As you dive deeper into digital circuits, you'll find these concepts appearing everywhere from logic gates to microprocessor architecture.
          </p>
        </div>
      </article>
    </div>
  );
};

export default NumberingAndCodingSystems;
