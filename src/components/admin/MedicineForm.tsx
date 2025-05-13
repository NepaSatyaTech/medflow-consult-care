
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Medicine, MedicineCategory } from '@/types';
import { categories } from '@/data/mockData';

// Exclude "All Categories" which is at index 0
const medicineCategories = categories.slice(1) as MedicineCategory[];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Medicine name must be at least 2 characters.",
  }),
  imageUrl: z.string().default("/placeholder.svg"),
  category: z.enum(medicineCategories as [MedicineCategory, ...MedicineCategory[]]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  inStock: z.boolean().default(true),
});

interface MedicineFormProps {
  medicine?: Medicine;
  onSave: (medicine: Medicine) => void;
  onCancel: () => void;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ medicine, onSave, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!medicine;
  
  const form = useForm<z.infer<typeof formSchema>>({
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
  
  function onSubmit(values: z.infer<typeof formSchema>) {
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
        description: `"{values.name}" has been {isEditing ? 'updated' : 'added'} successfully.`,
      });
      
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Medicine' : 'Add New Medicine'}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medicine name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medicineCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (Rs.)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      step="0.01"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">In Stock</FormLabel>
                    <FormDescription>
                      Is this medicine currently available?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter medicine description" 
                    className="resize-none min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <Input placeholder="Image URL" {...field} />
                    <img 
                      src={field.value} 
                      alt="Medicine Preview" 
                      className="h-16 w-16 object-cover border rounded"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Enter an image URL or leave as default placeholder
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
        </form>
      </Form>
    </div>
  );
};

export default MedicineForm;
