
import React, { useState, useEffect } from 'react';
import MedicineCard from './MedicineCard';
import { Medicine } from '@/types';

interface MedicineGridProps {
  medicines: Medicine[];
  category: string;
  searchTerm: string;
}

const MedicineGrid: React.FC<MedicineGridProps> = ({ 
  medicines, 
  category, 
  searchTerm 
}) => {
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>(medicines);
  
  useEffect(() => {
    let result = medicines;
    
    // Filter by category if not "All Categories"
    if (category !== 'All Categories') {
      result = result.filter(medicine => medicine.category === category);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(medicine => 
        medicine.name.toLowerCase().includes(searchLower) || 
        medicine.description.toLowerCase().includes(searchLower) ||
        medicine.category.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredMedicines(result);
    console.log('Filtered medicines updated:', result.length);
  }, [medicines, category, searchTerm]);
  
  if (filteredMedicines.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-600">No medicines found.</h3>
        <p className="text-gray-500 mt-2">Try changing your search or category filters.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredMedicines.map((medicine) => (
        <div key={medicine.id} className="fade-in-element" style={{animationDelay: `${parseInt(medicine.id) * 100}ms`}}>
          <MedicineCard medicine={medicine} />
        </div>
      ))}
    </div>
  );
};

export default MedicineGrid;
