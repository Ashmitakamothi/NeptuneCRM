import React from 'react';

const Loader = ({ size = 'md', color = '#158B86' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const dotSizeMap = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-4 h-4'
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const currentDotSize = dotSizeMap[size] || dotSizeMap.md;

  return (
    <div className={`relative ${currentSize} animate-spin`} style={{ animationDuration: '1.2s' }}>
      <div className="absolute top-0 left-0">
        <div className={`${currentDotSize} rounded-full`} style={{ backgroundColor: color, opacity: 1 }} />
      </div>
      <div className="absolute top-0 right-0">
        <div className={`${currentDotSize} rounded-full`} style={{ backgroundColor: color, opacity: 0.7 }} />
      </div>
      <div className="absolute bottom-0 right-0">
        <div className={`${currentDotSize} rounded-full`} style={{ backgroundColor: color, opacity: 0.4 }} />
      </div>
      <div className="absolute bottom-0 left-0">
        <div className={`${currentDotSize} rounded-full`} style={{ backgroundColor: color, opacity: 0.2 }} />
      </div>
    </div>
  );
};

export const FullPageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px] w-full">
    <Loader size="md" />
  </div>
);

export default Loader;
