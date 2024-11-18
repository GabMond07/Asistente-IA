import React from 'react';
import clsx from 'clsx';

export const ButtonDashboard = ({ variant = 'default', className, children, ...props }) => {
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    subtle: 'text-blue-500 hover:text-blue-600',
  };

  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
