import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('');

  // List of Indian states
  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleGetStarted = () => {
    // Validate state selection
    if (selectedState.trim() === '') {
      alert('Please select a state.');
      return;
    }

    // Pass selected state to the landing page
    navigate('/landing', { state: { selectedState } });
  };

  return (
    <div className="container">
      <div className="header">
        <h1 style={{ textAlign: 'center' }}>Disaster Management Tool</h1>
      </div>
      <div className="content">
        <p style={{ textAlign: 'center' }}>Help manage and report disasters in real-time.</p>
        <select
          value={selectedState}
          onChange={handleStateChange}
          style={{
            width: '50%',
            padding: '10px',
            margin: '20px auto',
            display: 'block',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <option value="">Select your state</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <button
          onClick={handleGetStarted}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            margin: '20px auto',
            display: 'block',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
      </div>
      <div className="footer">
        <p style={{ textAlign: 'center' }}>&copy; 2024 Disaster Management Tool</p>
      </div>
    </div>
  );
};

export default MainPage;
