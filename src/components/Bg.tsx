import React from 'react';

interface BgProps {
  variant?: 'game' | 'menu'; // Define the type for variant
}

const Bg: React.FC<BgProps> = ({ variant }) => {
  const bgPattern = variant === 'game' ? 'bgPatternGame' : 'bgPatternMenu';

  return (
    <div className="absolute w-full h-full left-0 top-0">
      <div className={`absolute w-full h-full left-0 top-0 ${bgPattern}`} />
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-t from-purple-900 mix-blend-multiply" />
    </div>
  );
};

export default Bg;
