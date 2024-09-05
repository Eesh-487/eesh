import React, { useState, useEffect } from 'react';
import './abc.css';

const MapComponent = ({ onLocationSelect, dangerLevel }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [circle, setCircle] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Default center to India
        zoom: 5,
      });

      const newCircle = createCircle(map, dangerLevel);

      google.maps.event.addListener(map, 'click', (event) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setLocation(clickedLocation);
        newCircle.setCenter(event.latLng);
        onLocationSelect(clickedLocation); // Pass location to the parent component
      });

      setCircle(newCircle);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7Et9iookTfVN0EkowyLh2I-oiGZJGOPo&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.addEventListener('load', initMap);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      initMap();
    }
  }, [dangerLevel]);

  // Function to create and style the circle
  const createCircle = (map, dangerLevel) => {
    return new google.maps.Circle({
      strokeColor: getCircleColor(dangerLevel),
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: getCircleColor(dangerLevel),
      fillOpacity: 0.35,
      map: map,
      center: { lat: 20.5937, lng: 78.9629 }, // Default center
      radius: 10000, // Default radius 10km
    });
  };

  // Function to return color based on danger level
  const getCircleColor = (level) => {
    switch (level) {
      case 'red':
        return '#FF0000'; // High Danger
      case 'green':
        return '#008000'; // Medium Danger
      case 'blue':
        return '#0000FF'; // Low Danger
      default:
        return '#FF0000'; // Default High Danger
    }
  };

  // Function to get the current geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(currentLocation);
        if (circle) {
          circle.setCenter(currentLocation);
        }
        onLocationSelect(currentLocation); // Update parent with current location
      });
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      <button onClick={getCurrentLocation} style={{ margin: '20px 0', padding: '10px' }}>
        Get Current Location
      </button>
      
    </div>
  );
};

export default MapComponent;
