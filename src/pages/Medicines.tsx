
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MedicineGrid from '@/components/medicines/MedicineGrid';
import { medicines as initialMedicines, categories } from '@/data/mockData';
import { useLocation } from 'react-router-dom';
import { Medicine } from '@/types';

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for category in URL query parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    
    // Load medicines from localStorage if available
    const storedMedicines = localStorage.getItem('medicines');
    if (storedMedicines) {
      try {
        const parsedMedicines = JSON.parse(storedMedicines);
        setMedicines(parsedMedicines);
        console.log('Loaded medicines from localStorage:', parsedMedicines.length);
      } catch (error) {
        console.error('Error parsing medicines from localStorage:', error);
      }
    }
  }, [location.search]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-10">
          <div className="text-center mb-10 fade-in-element">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Medicines</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of high-quality medicines and healthcare products.
            </p>
          </div>
          
          <div className="mb-8 fade-in-element" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-medflow-blue focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-medflow-blue focus:border-transparent md:w-64"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="fade-in-element" style={{ animationDelay: '200ms' }}>
            <MedicineGrid 
              medicines={medicines} 
              category={selectedCategory} 
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Medicines;
