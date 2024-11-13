import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Button = ({ variant = 'default', size = 'default', children, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      'rounded px-3 py-2 flex items-center justify-center',
      variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white',
      size === 'icon' && 'p-2'
    )}
  >
    {children}
  </button>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'outline']),
  size: PropTypes.oneOf(['default', 'icon']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
