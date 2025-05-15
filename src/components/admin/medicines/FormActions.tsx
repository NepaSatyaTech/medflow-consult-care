
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isSubmitting, isEditing, onCancel }) => {
  return (
    <div className="flex justify-end gap-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-medflow-blue hover:bg-medflow-blue-dark"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : (isEditing ? "Update Medicine" : "Add Medicine")}
      </Button>
    </div>
  );
};

export default FormActions;
