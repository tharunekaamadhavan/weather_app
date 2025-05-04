import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ location, setLocation, fetchWeather }) => {
 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or zip code..."
          className="search-input"
          aria-label="Search location"
        />
        <button
          type="submit"
          className="search-button"
          aria-label="Get weather"
        >
          Get Weather
        </button>
      </form>
     
    </div>
  );
};

export default SearchBar;