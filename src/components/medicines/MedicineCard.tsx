
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Medicine } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Card className="h-full flex flex-col card-hover overflow-hidden border-border">
      <div className="relative h-48 bg-gray-100">
        <img 
          src={medicine.imageUrl} 
          alt={medicine.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-medium py-1 px-2 rounded-full ${medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {medicine.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-medflow-blue bg-blue-50 py-1 px-2 rounded-full">
            {medicine.category}
          </span>
          <span className="font-semibold text-gray-900">${medicine.price.toFixed(2)}</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-2">{medicine.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{medicine.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-medflow-blue hover:bg-medflow-blue-dark"
          disabled={!medicine.inStock}
        >
          {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicineCard;
