import React from 'react';
import authBg from '../assets/authbg-Cm8s2HqT.png';

const AuthBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to ensure readability if needed, though usually not for this design */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
};

export default AuthBackground;
