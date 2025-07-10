import React from 'react';
import logoImage from '../assets/logo.png'; 

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center justify-center"> 
      <img
        src={logoImage}
        alt="Your Blog Logo" 
        style={{ width: width }} 
        className="h-auto object-contain"
      />
    </div>
  )
}

export default Logo