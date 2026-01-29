import React, { useRef, useState, useEffect } from "react";
import { Trash2, Zap, ZapOff, FileText, Plus, Download, RotateCcw } from "lucide-react";

// -------- LOGIC GATES --------
const GATE_LOGIC = {
  AND: (a, b) => a && b,
  OR: (a, b) => a || b,
  NAND: (a, b) => !(a && b),
  NOR: (a, b) => !(a || b),
  XOR: (a, b) => a !== b,
  XNOR: (a, b) => a === b,
  NOT: (a) => !a,
  BUFFER: (a) => a,
};

const GATE_SYMBOLS = {
  AND: "·",
  OR: "+",
  NAND: "⊼",
  NOR: "⊽",
  XOR: "⊕",
  XNOR: "⊙",
  NOT: "¬",
  BUFFER: "",
};

const uid = () => Math.random().toString(36).slice(2, 11);

// ================= PIN COMPONENT =================
function Pin({ x, y, type, active, label, onPointerDown, onPointerUp }) {
  const isInput = type === "input";
  const color = active ? "#22c55e" : isInput ? "#3b82f6" : "#ef4444";
  
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="6"
        fill={color}
        stroke="#fff"
        strokeWidth="2"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="cursor-crosshair touch-none"
        style={{ transition: "all 0.2s" }}
      />
      {label && (
        <text 
          x={x + (isInput ? -12 : 12)} 
          y={y + 4} 
          fontSize="10" 
          fill="#666" 
          textAnchor={isInput ? "end" : "start"}
          pointerEvents="none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// ================= INPUT SOURCE =================
function InputSource({ node, onToggle, onStartWire, onDelete, onDragStart, isDragging }) {
  return (
    <g style={{ filter: isDragging ? "drop-shadow(0 8px 18px rgba(2,6,23,0.12))" : "none", transition: "all 0.12s" }}>
      <rect 
        x={node.x} 
        y={node.y} 
        width="90" 
        height="70" 
        rx="8" 
        fill="#fff" 
        stroke="#d1d5db" 
        strokeWidth="2"
        onPointerDown={onDragStart}
        className="cursor-move"
      />
      
      <text 
        x={node.x + 45} 
        y={node.y + 22} 
        fontSize="12" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="#374151"
        pointerEvents="none"
      >
        {node.label || "INPUT"}
      </text>
      
      {/* Toggle Switch */}
      <g onClick={onToggle} className="cursor-pointer">
        <rect
          x={node.x + 25}
          y={node.y + 30}
          width="40"
          height="22"
          rx="11"
          fill={node.value ? "#22c55e" : "#9ca3af"}
        />
        <circle
          cx={node.x + (node.value ? 55 : 35)}
          cy={node.y + 41}
          r="9"
          fill="#fff"
          style={{ transition: "all 0.2s" }}
        />
      </g>
      
      {/* Output Pin */}
      <Pin
        x={node.x + 90}
        y={node.y + 35}
        type="output"
        active={node.value}
        onPointerDown={(e) => {
          e.stopPropagation();
          onStartWire(node.id, "out", e);
        }}
      />
      
      {/* Delete Button */}
      <g onClick={onDelete} className="cursor-pointer" opacity="0.7">
        <circle cx={node.x + 80} cy={node.y + 12} r="8" fill="#ef4444" />
        <line x1={node.x + 77} y1={node.y + 9} x2={node.x + 83} y2={node.y + 15} stroke="#fff" strokeWidth="2" />
        <line x1={node.x + 83} y1={node.y + 9} x2={node.x + 77} y2={node.y + 15} stroke="#fff" strokeWidth="2" />
      </g>
    </g>
  );
}

// ================= LOGIC GATE =================
function Gate({ node, onDragStart, onStartWire, onEndWire, onDelete, isDragging }) {
  const inputs = ["NOT", "BUFFER"].includes(node.type) ? 1 : 2;
  const width = 110;
  const height = 70 + (inputs - 1) * 15;

  return (
    <g style={{ filter: isDragging ? "drop-shadow(0 8px 18px rgba(2,6,23,0.12))" : "none", transition: "all 0.12s" }}>
      <rect
        x={node.x}
        y={node.y}
        width={width}
        height={height}
        rx="8"
        fill="#fff"
        stroke="#3b82f6"
        strokeWidth="2"
        onPointerDown={onDragStart}
        className="cursor-move"
      />
      
      <text
        x={node.x + width / 2}
        y={node.y + 22}
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        fill="#1e40af"
        pointerEvents="none"
      >
        {node.type}
      </text>
      
      {/* Output Indicator */}
      <circle
        cx={node.x + width / 2}
        cy={node.y + 40}
        r="10"
        fill={node.value ? "#22c55e" : "#e5e7eb"}
        stroke="#9ca3af"
        strokeWidth="2"
      />
      <text
        x={node.x + width / 2}
        y={node.y + 45}
        fontSize="11"
        fontWeight="bold"
        textAnchor="middle"
        fill={node.value ? "#fff" : "#666"}
        pointerEvents="none"
      >
        {node.value ? "1" : "0"}
      </text>
      
      {/* Input Pins */}
      {[...Array(inputs)].map((_, i) => (
        <Pin
          key={i}
          x={node.x}
          y={node.y + 30 + i * 30}
          type="input"
          label={String.fromCharCode(65 + i)}
          active={false}
          onPointerUp={(e) => {
            e.stopPropagation();
            onEndWire(node.id, `in${i}`, e);
          }}
        />
      ))}
      
      {/* Output Pin */}
      <Pin
        x={node.x + width}
        y={node.y + height / 2}
        type="output"
        label="Y"
        active={node.value}
        onPointerDown={(e) => {
          e.stopPropagation();
          onStartWire(node.id, "out", e);
        }}
      />
      
      {/* Delete Button */}
      <g onClick={onDelete} className="cursor-pointer" opacity="0.7">
        <circle cx={node.x + width - 12} cy={node.y + 12} r="8" fill="#ef4444" />
        <line x1={node.x + width - 15} y1={node.y + 9} x2={node.x + width - 9} y2={node.y + 15} stroke="#fff" strokeWidth="2" />
        <line x1={node.x + width - 9} y1={node.y + 9} x2={node.x + width - 15} y2={node.y + 15} stroke="#fff" strokeWidth="2" />
      </g>
    </g>
  );
}

// ================= LED OUTPUT =================
function LED({ node, onEndWire, onDelete, onDragStart, isDragging }) {
  return (
    <g style={{ filter: isDragging ? "drop-shadow(0 8px 18px rgba(2,6,23,0.12))" : "none", transition: "all 0.12s" }}>
      <rect 
        x={node.x} 
        y={node.y} 
        width="80" 
        height="80" 
        rx="8" 
        fill="#fff" 
        stroke="#d1d5db" 
        strokeWidth="2"
        onPointerDown={onDragStart}
        className="cursor-move"
      />
      
      <text 
        x={node.x + 40} 
        y={node.y + 20} 
        fontSize="11" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="#666"
        pointerEvents="none"
      >
        OUTPUT
      </text>
      
      <circle
        cx={node.x + 40}
        cy={node.y + 48}
        r="18"
        fill={node.value ? "#22c55e" : "#e5e7eb"}
        stroke={node.value ? "#16a34a" : "#9ca3af"}
        strokeWidth="3"
        style={{
          filter: node.value ? "drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))" : "none",
          transition: "all 0.2s"
        }}
      />
      
      <Pin
        x={node.x}
        y={node.y + 40}
        type="input"
        active={node.value}
        onPointerUp={(e) => {
          e.stopPropagation();
          onEndWire(node.id, "in0", e);
        }}
      />
      
      {/* Delete Button */}
      <g onClick={onDelete} className="cursor-pointer" opacity="0.7">
        <circle cx={node.x + 68} cy={node.y + 12} r="8" fill="#ef4444" />
        <line x1={node.x + 65} y1={node.y + 9} x2={node.x + 71} y2={node.y + 15} stroke="#fff" strokeWidth="2" />
        <line x1={node.x + 71} y1={node.y + 9} x2={node.x + 65} y2={node.y + 15} stroke="#fff" strokeWidth="2" />
      </g>
    </g>
  );
}

// ================= WIRE DRAWING =================
function drawWire(x1, y1, x2, y2, active, isPreview = false) {
  const dx = x2 - x1;
  const midX = x1 + dx / 2;
  
  const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  
  return (
    <path
      d={path}
      stroke={active ? "#22c55e" : isPreview ? "#ef4444" : "#64748b"}
      strokeWidth={active ? "3" : "2"}
      fill="none"
      strokeDasharray={isPreview ? "5,5" : "none"}
      style={{ transition: "all 0.2s" }}
    />
  );
}

// ================= MAIN SIMULATOR =================
export default function LogicGateSimulator() {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([
    { id: "A", kind: "INPUT", x: 50, y: 100, value: false, label: "A" },
    { id: "B", kind: "INPUT", x: 50, y: 220, value: false, label: "B" },
    { id: "LED1", kind: "LED", x: 700, y: 150, value: false, label: "OUT" },
  ]);

  const [wires, setWires] = useState([]);
  const [dragNode, setDragNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeWire, setActiveWire] = useState(null);
  const [showEquation, setShowEquation] = useState(false);
  const [showTruthTable, setShowTruthTable] = useState(false);

  // -------- GET PIN POSITION --------
  const getPinPosition = (nodeId, pin) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    if (node.kind === "INPUT") {
      return { x: node.x + 90, y: node.y + 35 };
    } else if (node.kind === "GATE") {
      const inputs = ["NOT", "BUFFER"].includes(node.type) ? 1 : 2;
      const width = 110;
      const height = 70 + (inputs - 1) * 15;
      
      if (pin === "out") {
        return { x: node.x + width, y: node.y + height / 2 };
      } else {
        const idx = parseInt(pin.slice(2));
        return { x: node.x, y: node.y + 30 + idx * 30 };
      }
    } else if (node.kind === "LED") {
      return { x: node.x, y: node.y + 40 };
    }
    return { x: 0, y: 0 };
  };

  // -------- ADD COMPONENT --------
  const addComponent = (kind, type = null) => {
    const newNode = {
      id: uid(),
      kind,
      x: 300,
      y: 200,
      value: false,
      label: kind === "INPUT" ? String.fromCharCode(65 + nodes.filter(n => n.kind === "INPUT").length) : kind === "LED" ? "OUT" : undefined,
    };
    if (type) newNode.type = type;
    setNodes((n) => [...n, newNode]);
  };

  // -------- MOUSE HANDLERS --------
  const getNodeDimensions = (node) => {
    if (!node) return { w: 100, h: 80 };
    if (node.kind === "INPUT") return { w: 90, h: 70 };
    if (node.kind === "LED") return { w: 80, h: 80 };
    if (node.kind === "GATE") {
      const inputs = ["NOT", "BUFFER"].includes(node.type) ? 1 : 2;
      const w = 110;
      const h = 70 + (inputs - 1) * 15;
      return { w, h };
    }
    return { w: 100, h: 80 };
  };

  const onPointerMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragNode) {
      setNodes((ns) =>
        ns.map((n) => {
          if (n.id !== dragNode) return n;
          const { w, h } = getNodeDimensions(n);
          // Snap to 10px grid
          let nx = Math.round((x - dragOffset.x) / 10) * 10;
          let ny = Math.round((y - dragOffset.y) / 10) * 10;
          // Constrain to canvas
          nx = Math.max(8, Math.min(nx, Math.max(8, Math.floor(rect.width - w - 8))));
          ny = Math.max(8, Math.min(ny, Math.max(8, Math.floor(rect.height - h - 8))));
          return { ...n, x: nx, y: ny };
        })
      );
    }

    if (activeWire) {
      setActiveWire({ ...activeWire, x2: x, y2: y });
    }
  };

  const onPointerUp = (e) => {
    setDragNode(null);
    setActiveWire(null);
  };

  const handleDragStart = (nodeId, e) => {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pointer capture helps keep dragging smooth on touch
    try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch (err) {}

    setDragNode(nodeId);
    setDragOffset({ x: x - node.x, y: y - node.y });
  };

  // -------- WIRING --------
  const startWire = (nodeId, pin, e) => {
    e.stopPropagation();
    const pos = getPinPosition(nodeId, pin);
    setActiveWire({ from: { nodeId, pin }, x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
  };

  const endWire = (nodeId, pin, e) => {
    if (!activeWire) return;
    e.stopPropagation();
    
    // Check if wire already exists
    const exists = wires.some(
      (w) => w.to.nodeId === nodeId && w.to.pin === pin
    );
    
    if (!exists) {
      setWires((w) => [...w, { id: uid(), from: activeWire.from, to: { nodeId, pin } }]);
    }
    setActiveWire(null);
  };

  const deleteWire = (wireId) => {
    setWires((w) => w.filter((wire) => wire.id !== wireId));
  };

  const deleteNode = (nodeId) => {
    setNodes((n) => n.filter((node) => node.id !== nodeId));
    setWires((w) => w.filter((wire) => wire.from.nodeId !== nodeId && wire.to.nodeId !== nodeId));
  };

  // -------- SIMULATION --------
  useEffect(() => {
    const values = {};
    const inputNodes = nodes.filter((n) => n.kind === "INPUT");

    inputNodes.forEach((n) => {
      values[n.id] = n.value;
    });

    // Propagate signals through gates
    for (let iteration = 0; iteration < 10; iteration++) {
      nodes.forEach((n) => {
        if (n.kind === "GATE") {
          const connectedWires = wires.filter((w) => w.to.nodeId === n.id);
          const inputs = connectedWires
            .sort((a, b) => a.to.pin.localeCompare(b.to.pin))
            .map((w) => values[w.from.nodeId] || false);

          if (n.type === "NOT" || n.type === "BUFFER") {
            values[n.id] = GATE_LOGIC[n.type](inputs[0] || false);
          } else if (inputs.length >= 2) {
            values[n.id] = GATE_LOGIC[n.type](inputs[0], inputs[1]);
          }
        }

        if (n.kind === "LED") {
          const wire = wires.find((w) => w.to.nodeId === n.id);
          values[n.id] = wire ? values[wire.from.nodeId] : false;
        }
      });
    }

    setNodes((ns) => ns.map((n) => ({ ...n, value: values[n.id] || false })));
  }, [wires, nodes.filter((n) => n.kind === "INPUT").map((n) => `${n.id}:${n.value}`).join(",")]);

  // -------- GENERATE BOOLEAN EQUATION --------
  const generateEquation = () => {
    const outputs = nodes.filter((n) => n.kind === "LED");
    const equations = outputs.map((output) => {
      const equation = buildEquation(output.id, new Set());
      return `${output.label || output.id} = ${equation}`;
    });
    return equations.join("\n");
  };

  const buildEquation = (nodeId, visited) => {
    if (visited.has(nodeId)) return "?";
    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return "?";

    if (node.kind === "INPUT") {
      return node.label || nodeId;
    }

    if (node.kind === "LED") {
      const wire = wires.find((w) => w.to.nodeId === nodeId);
      return wire ? buildEquation(wire.from.nodeId, visited) : "0";
    }

    if (node.kind === "GATE") {
      const connectedWires = wires
        .filter((w) => w.to.nodeId === nodeId)
        .sort((a, b) => a.to.pin.localeCompare(b.to.pin));

      const inputs = connectedWires.map((w) => buildEquation(w.from.nodeId, new Set(visited)));

      if (node.type === "NOT") {
        return `¬(${inputs[0] || "0"})`;
      } else if (node.type === "BUFFER") {
        return inputs[0] || "0";
      } else if (inputs.length >= 2) {
        const symbol = GATE_SYMBOLS[node.type];
        return `(${inputs[0]} ${symbol} ${inputs[1]})`;
      }
    }

    return "?";
  };

  // -------- CLEAR ALL --------
  const clearAll = () => {
    setNodes([
      { id: "A", kind: "INPUT", x: 50, y: 100, value: false, label: "A" },
      { id: "B", kind: "INPUT", x: 50, y: 220, value: false, label: "B" },
      { id: "LED1", kind: "LED", x: 700, y: 150, value: false, label: "OUT" },
    ]);
    setWires([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="font-semibold text-slate-700 mr-2 flex items-center">Components:</div>
            <button
              onClick={() => addComponent("INPUT")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            >
              <Plus size={16} /> Input
            </button>
            <button
              onClick={() => addComponent("LED")}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center gap-2"
            >
              <Plus size={16} /> LED Output
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="font-semibold text-slate-700 mr-2 flex items-center">Gates:</div>
            {Object.keys(GATE_LOGIC).map((gate) => (
              <button
                key={gate}
                onClick={() => addComponent("GATE", gate)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {gate}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t">
            <button
              onClick={() => setShowEquation(!showEquation)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
            >
              <FileText size={16} /> {showEquation ? "Hide" : "Show"} Equation
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
            >
              <RotateCcw size={16} /> Clear All
            </button>
          </div>
        </div>

        {/* Equation Display */}
        {showEquation && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Boolean Equation</h3>
            <pre className="bg-slate-50 p-4 rounded border text-lg font-mono text-slate-700">
              {generateEquation() || "No outputs connected"}
            </pre>
          </div>
        )}

        {/* Canvas */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div
            ref={canvasRef}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="relative bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 touch-none overflow-auto h-[60vh] md:h-[600px]"
            style={{ cursor: dragNode || activeWire ? "crosshair" : "default" }}
          >
            <svg className="absolute inset-0 w-full h-full">
              {/* Draw existing wires */}
              {wires.map((wire) => {
                const from = getPinPosition(wire.from.nodeId, wire.from.pin);
                const to = getPinPosition(wire.to.nodeId, wire.to.pin);
                const fromNode = nodes.find((n) => n.id === wire.from.nodeId);
                return (
                  <g key={wire.id}>
                    {drawWire(from.x, from.y, to.x, to.y, fromNode?.value)}
                    <circle
                      cx={(from.x + to.x) / 2}
                      cy={(from.y + to.y) / 2}
                      r="12"
                      fill="#ef4444"
                      opacity="0"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() => deleteWire(wire.id)}
                    />
                  </g>
                );
              })}

              {/* Draw preview wire */}
              {activeWire && drawWire(activeWire.x1, activeWire.y1, activeWire.x2, activeWire.y2, false, true)}

              {/* Draw all components */}
              {nodes.map((node) => {
                if (node.kind === "INPUT") {
                  return (
                    <InputSource
                      key={node.id}
                      node={node}
                      onToggle={() =>
                        setNodes((ns) =>
                          ns.map((n) => (n.id === node.id ? { ...n, value: !n.value } : n))
                        )
                      }
                      onStartWire={startWire}
                      onDelete={() => deleteNode(node.id)}
                      onDragStart={(e) => handleDragStart(node.id, e)}
                      isDragging={dragNode === node.id}
                    />
                  );
                } else if (node.kind === "GATE") {
                  return (
                    <Gate
                      key={node.id}
                      node={node}
                      onDragStart={(e) => handleDragStart(node.id, e)}
                      onStartWire={startWire}
                      onEndWire={endWire}
                      onDelete={() => deleteNode(node.id)}
                      isDragging={dragNode === node.id}
                    />
                  );
                } else if (node.kind === "LED") {
                  return (
                    <LED
                      key={node.id}
                      node={node}
                      onEndWire={endWire}
                      onDelete={() => deleteNode(node.id)}
                      onDragStart={(e) => handleDragStart(node.id, e)}
                      isDragging={dragNode === node.id}
                    />
                  );
                }
                return null;
              })}
            </svg>
          </div>

          <div className="mt-4 text-sm text-slate-600 space-y-1">
            <p>• <strong>Drag components</strong> to reposition them</p>
            <p>• <strong>Drag from output pins</strong> (red) to input pins (blue) to create wires</p>
            <p>• <strong>Click toggle switches</strong> to change input values</p>
            <p>• <strong>Click red dots</strong> on wires to delete them</p>
            <p>• <strong>Click × buttons</strong> to delete components</p>
          </div>
        </div>
      </div>
    </div>
  );
}