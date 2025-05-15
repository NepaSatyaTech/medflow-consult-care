
import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import MedicineForm from '@/components/admin/MedicineForm';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Medicine } from '@/types';
import { medicines as initialMedicines } from '@/data/mockData';
import { IndianRupee } from 'lucide-react';

const AdminMedicines = () => {
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Medicines Management</h1>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-medflow-blue hover:bg-medflow-blue-dark"
            >
              Add New Medicine
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-medflow-blue focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No medicines found. Try a different search term or add a new medicine.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMedicines.map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                            <img 
                              src={medicine.imageUrl} 
                              alt={medicine.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{medicine.name}</TableCell>
                        <TableCell>{medicine.category}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs">
                          <span className="line-clamp-2">{medicine.description}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <IndianRupee size={14} className="mr-1" />
                            {medicine.price.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingMedicine(medicine)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => setMedicineToDelete(medicine)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      
      {/* Add/Edit Medicine Dialog */}
      <Dialog open={showAddForm || !!editingMedicine} onOpenChange={() => {
        setShowAddForm(false);
        setEditingMedicine(null);
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
          </DialogHeader>
          <MedicineForm 
            medicine={editingMedicine || undefined} 
            onSave={handleSaveMedicine} 
            onCancel={() => {
              setShowAddForm(false);
              setEditingMedicine(null);
            }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!medicineToDelete} onOpenChange={() => setMedicineToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{medicineToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMedicineToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMedicine}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedicines;
