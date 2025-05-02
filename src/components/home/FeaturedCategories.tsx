
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';

const FeaturedCategories = () => {
  // Skip "All Categories" which is at index 0
  const displayCategories = categories.slice(1);
  
  const categoryIcons: Record<string, string> = {
    'Cold & Flu': '🤧',
    'Pain Relief': '💊',
    'Digestive': '�胃',
    'Vitamins': '💪',
    'First Aid': '🩹',
    'Allergy': '🌼',
    'Diabetes': '🩸',
    'Heart Health': '❤️'
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 fade-in-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Medicine Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive range of health products organized by category.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayCategories.map((category, index) => (
            <Link 
              key={category} 
              to={`/medicines?category=${encodeURIComponent(category)}`}
              className="fade-in-element"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-medflow-blue hover:text-white transition-colors duration-300 card-hover h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">{categoryIcons[category] || '💊'}</div>
                <h3 className="font-medium text-lg">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
