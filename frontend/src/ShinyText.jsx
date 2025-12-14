import React from 'react';

const ShinyText = ({ text, disabled = false, speed = 3, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        // 1. The Gradient: 
        // Edge (40%): #dec2eeff (White - The Static Color)
        // Center (50%): #352d37ff (Gray - The Flow Color)
        // Edge (60%): #dec2eeff(White - The Static Color)
        backgroundImage: 'linear-gradient(120deg, #dec2eeff 40%, #3e3440ff 50%, #dec2eeff 60%)',
        
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        

        WebkitTextFillColor: 'transparent',
        
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;