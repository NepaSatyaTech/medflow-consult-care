
import { useState } from 'react';
import { Medicine } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useMedicineManager = (initialMedicines: Medicine[]) => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSaveMedicine = (medicine: Medicine) => {
    // Get the current date and time for logging
    const timestamp = new Date().toISOString();
    
    if (editingMedicine) {
      // Update existing medicine
      const updatedMedicines = medicines.map(med => med.id === medicine.id ? medicine : med);
      setMedicines(updatedMedicines);
      
      // Update localStorage to ensure changes persist across the site
      localStorage.setItem('medicines', JSON.stringify(updatedMedicines));
      
      setEditingMedicine(null);
      toast({
        title: "Medicine Updated",
        description: `"${medicine.name}" has been updated successfully at ${timestamp}.`,
      });
      
      // Log the update for debugging
      console.log(`Medicine updated: ${medicine.name} at ${timestamp}`, medicine);
    } else {
      // Add new medicine
      const newMedicines = [...medicines, medicine];
      setMedicines(newMedicines);
      
      // Update localStorage to ensure changes persist across the site
      localStorage.setItem('medicines', JSON.stringify(newMedicines));
      
      setShowAddForm(false);
      toast({
        title: "Medicine Added",
        description: `"${medicine.name}" has been added successfully at ${timestamp}.`,
      });
      
      // Log the addition for debugging
      console.log(`New medicine added: ${medicine.name} at ${timestamp}`, medicine);
    }
  };
  
  const handleDeleteMedicine = () => {
    if (medicineToDelete) {
      const updatedMedicines = medicines.filter(med => med.id !== medicineToDelete.id);
      setMedicines(updatedMedicines);
      
      // Update localStorage to ensure changes persist across the site
      localStorage.setItem('medicines', JSON.stringify(updatedMedicines));
      
      toast({
        title: "Medicine Deleted",
        description: `"${medicineToDelete.name}" has been deleted successfully.`,
      });
      setMedicineToDelete(null);
    }
  };

  return {
    medicines,
    setMedicines,
    showAddForm,
    setShowAddForm,
    editingMedicine,
    setEditingMedicine,
    medicineToDelete,
    setMedicineToDelete,
    searchTerm,
    setSearchTerm,
    filteredMedicines,
    handleSaveMedicine,
    handleDeleteMedicine
  };
};
