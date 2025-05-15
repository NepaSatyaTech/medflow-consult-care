
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Medicine } from '@/types';
import MedicineFormFields, { formSchema, FormData } from './MedicineFormFields';
import ImageUpload from './ImageUpload';
import FormActions from './FormActions';

interface MedicineFormProps {
  medicine?: Medicine;
  onSave: (medicine: Medicine) => void;
  onCancel: () => void;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ medicine, onSave, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(medicine?.imageUrl || "/placeholder.svg");
  const isEditing = !!medicine;
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: medicine ? {
      name: medicine.name,
      imageUrl: medicine.imageUrl,
      category: medicine.category,
      description: medicine.description,
      price: medicine.price,
      inStock: medicine.inStock,
    } : {
      name: "",
      imageUrl: "/placeholder.svg",
      category: "Pain Relief",
      description: "",
      price: 0,
      inStock: true,
    },
  });
  
  function onSubmit(values: FormData) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Create a proper Medicine object with all required fields
      const savedMedicine: Medicine = {
        id: medicine?.id || Math.random().toString(36).substring(2, 9),
        name: values.name,
        imageUrl: values.imageUrl,
        category: values.category,
        description: values.description,
        price: values.price,
        inStock: values.inStock,
      };
      
      onSave(savedMedicine);
      
      toast({
        title: isEditing ? "Medicine Updated" : "Medicine Added",
        description: `"${values.name}" has been ${isEditing ? 'updated' : 'added'} successfully.`,
      });
      
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Medicine' : 'Add New Medicine'}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <MedicineFormFields form={form} />
          
          <ImageUpload 
            form={form}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
          
          <FormActions 
            isSubmitting={isSubmitting}
            isEditing={isEditing}
            onCancel={onCancel}
          />
        </form>
      </Form>
    </div>
  );
};

export default MedicineForm;
