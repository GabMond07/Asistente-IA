// src/components/ui/avatar.js
import React from 'react';

export const Avatar = ({ children, className }) => (
  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 ${className}`}>
    {children}
  </div>
);

export const AvatarFallback = ({ children }) => (
  <span className="text-gray-700">{children}</span>
);

export const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-10 h-10 rounded-full" />
);
