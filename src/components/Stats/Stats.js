import React, { useState, useEffect } from 'react';
import './Stats.css';

const Stats = () => {
  const [counts, setCounts] = useState({
    wasteCollected: 0,
    partnersOnboarded: 0,
    compostProduced: 0
  });

  const targetCounts = {
    wasteCollected: 50, // in kg
    partnersOnboarded: 5,
    compostProduced: 25 // in kg
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds for the animation
    const steps = 60;
    const interval = duration / steps;

    const incrementValues = {
      wasteCollected: targetCounts.wasteCollected / steps,
      partnersOnboarded: targetCounts.partnersOnboarded / steps,
      compostProduced: targetCounts.compostProduced / steps
    };

    const counter = setInterval(() => {
      setCounts(prevCounts => {
        const newCounts = {
          wasteCollected: Math.min(prevCounts.wasteCollected + incrementValues.wasteCollected, targetCounts.wasteCollected),
          partnersOnboarded: Math.min(prevCounts.partnersOnboarded + incrementValues.partnersOnboarded, targetCounts.partnersOnboarded),
          compostProduced: Math.min(prevCounts.compostProduced + incrementValues.compostProduced, targetCounts.compostProduced)
        };

        if (Object.keys(newCounts).every(key => newCounts[key] >= targetCounts[key])) {
          clearInterval(counter);
        }

        return newCounts;
      });
    }, interval);

    return () => clearInterval(counter);
  }, []);

  return (
    <section className="stats">
      <div className="stats-container">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🗑️</span>
            <div className="stat-number">{Math.round(counts.wasteCollected).toLocaleString()}kg</div>
            <p>Waste Collected</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🤝</span>
            <div className="stat-number">{Math.round(counts.partnersOnboarded).toLocaleString()}</div>
            <p>Partners Onboarded</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🌱</span>
            <div className="stat-number">{Math.round(counts.compostProduced).toLocaleString()}kg</div>
            <p>Compost Produced</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;