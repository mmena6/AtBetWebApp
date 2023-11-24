import React, { useState, useEffect } from 'react';
import colors from '../resources/colors';

const GradientBar = ({ value, backgroundColor }) => {
  const [opacity, setOpacity] = useState(0);
  const fillerBackground = `linear-gradient(to right, ${colors.gradYellow}, ${backgroundColor})`;
  
  const fillerStyles = {
    height: '70%',
    width: `${value}%`,
    background: fillerBackground, 
    borderRadius: 'inherit',
    textAlign: 'left',
    transition: 'width 0.6s ease, opacity 0.6s ease',
    opacity: opacity
  };

  const containerStyles = {
    height: '10%',
    width: "100%", 
    backgroundColor: backgroundColor || '#e0e0de',
    borderRadius: 6,
    overflow: 'hidden'
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={{ padding: 5, color: 'white', fontWeight: 'bold' }}></span>
      </div>
    </div>
  );
};

export default GradientBar;
