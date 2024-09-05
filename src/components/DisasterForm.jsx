import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import './abc.css';

const DisasterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    description: '',
    disasterType: '',
    files: [],
    dangerLevel: 'red', // Default to red
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, latitude: location.lat, longitude: location.lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('age', formData.age);
    form.append('description', formData.description);
    form.append('disasterType', formData.disasterType);
    form.append('dangerLevel', formData.dangerLevel);
    form.append('latitude', formData.latitude);
    form.append('longitude', formData.longitude);
    for (let i = 0; i < formData.files.length; i++) {
      form.append('files', formData.files[i]);
    }

    // Placeholder for API request
    try {
      const response = await axios.post('/api/disaster-report', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting the report:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group">
          <label>Disaster Type:</label>
          <input
            type="text"
            name="disasterType"
            value={formData.disasterType}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group">
          <label>Disaster Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Danger Level:</label>
          <select
            name="dangerLevel"
            value={formData.dangerLevel}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="red">High Danger (Red)</option>
            <option value="green">Medium Danger (Green)</option>
            <option value="blue">Low Danger (Blue)</option>
          </select>
        </div>

        <MapComponent
          onLocationSelect={handleLocationSelect}
          dangerLevel={formData.dangerLevel} // Pass danger level to map
        />

        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            readOnly
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            readOnly
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        
        <button
          type="submit"
          className="submit-button"
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '20px'
          }}
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default DisasterForm;
