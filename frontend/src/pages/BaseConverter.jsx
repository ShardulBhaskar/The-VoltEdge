import React, { useState } from 'react';
import { Binary, Trash2 } from 'lucide-react';
import { convertBase, isValidBinary, isValidDecimal, isValidHex, isValidOctal } from '../components/baseConverter/logic';

const BaseConverter = () => {
  const [values, setValues] = useState({
    decimal: '',
    binary: '',
    octal: '',
    hex: ''
  });

  const [error, setError] = useState(null);

  const handleClear = () => {
    setValues({
      decimal: '',
      binary: '',
      octal: '',
      hex: ''
    });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error on new input
    setError(null);

    // If empty, clear all
    if (!value) {
        handleClear();
        return;
    }

    // Update the field being typed in immediately
    setValues((prev) => ({ ...prev, [name]: value }));

    let isValid = false;
    let decimalVal = '';

    // Validate and convert to decimal primarily
    switch (name) {
      case 'decimal':
        isValid = isValidDecimal(value);
        if (isValid) decimalVal = value;
        break;
      case 'binary':
        isValid = isValidBinary(value);
        if (isValid) decimalVal = convertBase(value, 2, 10);
        break;
      case 'octal':
        isValid = isValidOctal(value);
        if (isValid) decimalVal = convertBase(value, 8, 10);
        break;
      case 'hex':
        isValid = isValidHex(value);
        if (isValid) decimalVal = convertBase(value, 16, 10);
        break;
      default:
        break;
    }

    if (!isValid) {
      setError(`Invalid ${name} format`);
      // We don't update other fields if invalid
      return;
    }

    // Update all other fields based on the derived decimal value
    // We do NOT overwrite the field currently being typed (name) to verify user input continuity
    // But since the logic is deterministic, re-converting it back *should* be fine unless leading zeros issues.
    // For safety, we only update 'other' fields.
    const newValues = {
        decimal: name === 'decimal' ? value : convertBase(decimalVal, 10, 10),
        binary: name === 'binary' ? value : convertBase(decimalVal, 10, 2),
        octal: name === 'octal' ? value : convertBase(decimalVal, 10, 8),
        hex: name === 'hex' ? value : convertBase(decimalVal, 10, 16)
    };

    setValues(newValues);
  };

  const inputFields = [
    { id: 'decimal', label: 'Decimal (Base 10)', placeholder: 'e.g. 19' },
    { id: 'binary', label: 'Binary (Base 2)', placeholder: 'e.g. 10011' },
    { id: 'octal', label: 'Octal (Base 8)', placeholder: 'e.g. 23' },
    { id: 'hex', label: 'Hexadecimal (Base 16)', placeholder: 'e.g. 13' },
  ];

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-2 min-h-[60vh] mt-2">
      <div className="flex items-center gap-4 p-4 w-full justify-center">
        <div className="p-3 bg-orange-50 rounded-xl">
           <Binary className="w-8 h-8 text-orange-600" />
        </div>
        <div>
           <h1 className="text-xl md:text-3xl font-bold text-slate-900">Base Converter</h1>
           <p className="text-sm md:text-lg text-slate-500">Seamlessly translate between Hex, Binary, Decimal, and Octal.</p>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center border-2 border-dashed border-slate-200 rounded-xl p-4 md:p-8 bg-slate-50 w-full max-w-4xl mx-auto">
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                    <label 
                        htmlFor={field.id} 
                        className="text-sm font-semibold text-slate-700 ml-1"
                    >
                        {field.label}
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id={field.id}
                            name={field.id}
                            value={values[field.id]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-slate-900 font-mono transition-all"
                            autoComplete="off"
                        />
                    </div>
                </div>
            ))}
        </div>

        {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium w-full text-center animate-pulse">
                {error}
            </div>
        )}

        <div className="mt-8 flex justify-center">
            <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:text-red-500 transition-colors font-medium text-sm shadow-sm"
            >
                <Trash2 className="w-4 h-4" />
                Clear All
            </button>
        </div>

      </div>
    </div>
  );
};

export default BaseConverter;