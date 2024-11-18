import React from 'react';

export const Progress = ({ value, className }) => (
  <div className={`relative w-full h-4 bg-gray-200 rounded-md ${className}`}>
    <div
      className="absolute h-4 bg-blue-500 rounded-md transition-all"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);
