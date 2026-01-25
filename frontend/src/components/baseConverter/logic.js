
// Basic validation helpers
export function isValidBinary(str) {
  return /^[01]*$/.test(str);
}

export function isValidOctal(str) {
  return /^[0-7]*$/.test(str);
}

export function isValidDecimal(str) {
  return /^\d*$/.test(str);
}

export function isValidHex(str) {
  return /^[0-9A-Fa-f]*$/.test(str);
}

// Core conversion Logic
// We will convert everything to Decimal first (as BigInt or Number), then to target.
// Using BigInt to support larger numbers if possible, or just standard parseInt if simple.
// Standard parseInt/toString supports bases 2-36. 

/*
  Converts a string representation of a number from a source base to a target base.
  Returns empty string if input is invalid.
*/
export function convertBase(value, fromBase, toBase) {
  if (!value) return "";
  
  // Clean up input
  value = value.trim();

  // Validate based on fromBase
  let isValid = false;
  switch(fromBase) {
    case 2: isValid = isValidBinary(value); break;
    case 8: isValid = isValidOctal(value); break;
    case 10: isValid = isValidDecimal(value); break;
    case 16: isValid = isValidHex(value); break;
    default: return "";
  }

  if (!isValid) return null; // Indicate error

  try {
    // We use parseInt for standard bases. 
    // Limitation: parseInt loses precision for very large numbers > 2^53.
    
    const decimalValue = parseInt(value, fromBase);
    
    if (isNaN(decimalValue)) return "";

    return decimalValue.toString(toBase).toUpperCase();
  } catch (e) {
    console.error(e);
    return "";
  }
}

// Helper to update all states based on one change
// Returns an object { binary, octal, decimal, hex } or null if invalid
export function updateAllBases(value, sourceBase) {
    const res = convertBase(value, sourceBase, 10);
    
    // If conversion failed (invalid input), return null
    if (res === null) return null;
    if (res === "") return { binary: "", octal: "", decimal: "", hex: "" };

    const decValues = parseInt(res, 10); // convertBase returned string decimal, now number for other conversions

    return {
        binary: convertBase(res, 10, 2),
        octal: convertBase(res, 10, 8),
        decimal: res,
        hex: convertBase(res, 10, 16)
    };
}
