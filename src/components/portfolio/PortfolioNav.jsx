import React from 'react';

const PortfolioNav = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        { id: "resume", label: "Resume" },
        { id: "robotics", label: "Robotics" },
        { id: "deep-learning", label: "Deep Learning" },
        { id: "software-systems", label: "Software & Systems" },
        { id: "hardware-fabrication", label: "Hardware & Fabrication" },
        { id: "hackathons", label: "Hackathons" },
        { id: "3d-art", label: "3D Art" },
        { id: "foundations", label: "Foundations" },
    ];      

  return (
    <div className="portfolio-nav mb-4">
      {categories.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={`nav-btn ${activeCategory === id ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PortfolioNav;