/**
 * Input validation utilities
 */

// Sanitize query parameters to prevent NoSQL injection
exports.sanitizeQuery = (query) => {
  const sanitized = {};
  
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      
      // Only allow primitive values (strings, numbers, booleans)
      // Reject objects and arrays which could contain MongoDB operators
      if (typeof value === 'object' && value !== null) {
        // Skip this parameter to prevent injection
        continue;
      }
      
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

// Validate ObjectId format
exports.isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Sanitize string input
exports.sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  // Remove potential MongoDB operators
  return str.replace(/^\$/, '');
};
