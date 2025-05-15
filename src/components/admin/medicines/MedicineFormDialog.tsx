
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import MedicineForm from '@/components/admin/medicines/MedicineForm';
import { Medicine } from '@/types';

interface MedicineFormDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  medicine: Medicine | null;
  onSave: (medicine: Medicine) => void;
}

const MedicineFormDialog: React.FC<MedicineFormDialogProps> = ({
  isOpen,
  onOpenChange,
  medicine,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{medicine ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
        </DialogHeader>
        <MedicineForm 
          medicine={medicine || undefined} 
          onSave={onSave} 
          onCancel={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MedicineFormDialog;
