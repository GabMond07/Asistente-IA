import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-lg p-4 ${className}`}>{children}</div>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

export const CardHeader = ({ children }) => (
  <div className="mb-4 border-b pb-2">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const CardContent = ({ children }) => <div>{children}</div>;
