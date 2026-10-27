import React from 'react';
const Loader = ({ size = 'md' }) => (
  <div className={`loader loader--${size}`} role="status" aria-label="Loading">
    <div className="loader-ring" />
  </div>
);
export default Loader;
