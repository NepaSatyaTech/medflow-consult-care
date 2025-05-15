
import React, { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { medicines as initialMedicines } from '@/data/mockData';
import MedicineTable from '@/components/admin/medicines/MedicineTable';
import MedicineSearch from '@/components/admin/medicines/MedicineSearch';
import DeleteConfirmationDialog from '@/components/admin/medicines/DeleteConfirmationDialog';
import MedicineFormDialog from '@/components/admin/medicines/MedicineFormDialog';
import { useMedicineManager } from '@/hooks/useMedicineManager';

const AdminMedicines = () => {
  const {
    filteredMedicines,
    showAddForm,
    setShowAddForm,
    editingMedicine,
    setEditingMedicine,
    medicineToDelete,
    setMedicineToDelete,
    searchTerm,
    setSearchTerm,
    handleSaveMedicine,
    handleDeleteMedicine
  } = useMedicineManager(initialMedicines);

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
              <MedicineSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            
            <MedicineTable
              filteredMedicines={filteredMedicines}
              onEditMedicine={setEditingMedicine}
              onDeleteMedicine={setMedicineToDelete}
            />
          </div>
        </div>
      </main>
      
      {/* Add/Edit Medicine Dialog */}
      <MedicineFormDialog
        isOpen={showAddForm || !!editingMedicine}
        onOpenChange={() => {
          setShowAddForm(false);
          setEditingMedicine(null);
        }}
        medicine={editingMedicine}
        onSave={handleSaveMedicine}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        medicineToDelete={medicineToDelete}
        onCancel={() => setMedicineToDelete(null)}
        onConfirm={handleDeleteMedicine}
      />
    </div>
  );
};

export default AdminMedicines;
