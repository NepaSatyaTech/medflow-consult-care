
import React from 'react';
import { FileImage } from "lucide-react";
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FormData } from './MedicineFormFields';

// For demo purposes, these are placeholder images
const placeholderImages = [
  "/placeholder.svg",
  "/paracetamol500.jpeg",
  "/multivatimin.jpg",
  "/allergy.jpg",
  "/digestive.jpg",
  "/heart.jpg",
];

interface ImageUploadProps {
  form: UseFormReturn<FormData>;
  previewImage: string;
  setPreviewImage: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ form, previewImage, setPreviewImage }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server
      // For this demo, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      form.setValue("imageUrl", imageUrl);
    }
  };

  const selectPlaceholderImage = (url: string) => {
    setPreviewImage(url);
    form.setValue("imageUrl", url);
  };

  return (
    <FormField
      control={form.control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Medicine Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 relative border rounded-md overflow-hidden">
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={previewImage} 
                      alt="Medicine Preview" 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-medflow-blue text-white px-3 py-2 rounded-md hover:bg-medflow-blue-dark">
                        <FileImage size={16} />
                        <span>Upload Image</span>
                      </div>
                      <input 
                        id="image-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                    <Input 
                      placeholder="Or enter image URL" 
                      className="flex-1"
                      value={field.value} 
                      onChange={(e) => {
                        field.onChange(e);
                        setPreviewImage(e.target.value);
                      }}
                    />
                  </div>
                  <FormDescription>
                    Upload an image or provide an image URL
                  </FormDescription>
                </div>
              </div>
              
              <div>
                <FormDescription className="mb-2">Or select from sample images:</FormDescription>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {placeholderImages.map((url, index) => (
                    <div 
                      key={index}
                      onClick={() => selectPlaceholderImage(url)}
                      className={`cursor-pointer border-2 rounded-md overflow-hidden h-16 ${previewImage === url ? 'border-medflow-blue' : 'border-transparent'}`}
                    >
                      <img src={url} alt={`Sample ${index+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUpload;
