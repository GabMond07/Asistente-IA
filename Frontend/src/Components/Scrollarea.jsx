import React from 'react';

export const ScrollArea = ({ children, className }) => (
  <div className={`overflow-y-auto ${className}`}>
    {children}
  </div>
);
