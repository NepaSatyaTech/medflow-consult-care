
import React, { useState, useEffect, useRef } from 'react';
import { statsData } from '@/data/mockData';

const StatsCounter = ({ value, label }: { value: number, label: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    let interval: number;
    
    if (isVisible) {
      const step = Math.max(1, Math.floor(value / 100));
      
      interval = window.setInterval(() => {
        setCount((prevCount) => {
          const nextCount = prevCount + step;
          return nextCount >= value ? value : nextCount;
        });
      }, 20);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, value]);
  
  return (
    <div ref={counterRef} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-medflow-blue mb-2">{count.toLocaleString()}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 fade-in-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud of the positive difference we've made in healthcare.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 fade-in-element"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatsCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
