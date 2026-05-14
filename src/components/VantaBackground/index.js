import React from 'react';

// Vanta imports removed because vanta.birds globally parses on require and crashes when THREE isn't exposed correctly in newer React apps.
// The background rendering is completely fulfilled natively by ParallaxAtmosphere components.
const VantaBackground = () => {
  return null;
};

export default VantaBackground;
