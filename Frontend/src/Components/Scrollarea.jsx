import React, { useEffect, useRef } from 'react';

export const ScrollArea = ({ children, className }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div ref={scrollRef} className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};
