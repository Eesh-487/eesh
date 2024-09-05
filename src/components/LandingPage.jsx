// LandingPage.jsx
import React from 'react';
import MapComponent from './MapComponent';
import DisasterForm from './DisasterForm';
import './abc.css';

const LandingPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Your Location and Report a Disaster</h2>
      <MapComponent />
      <DisasterForm />
    </div>
  );
};

export default LandingPage;
