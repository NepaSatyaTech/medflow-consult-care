
import React from 'react';
import { Medicine } from '@/types';
import { IndianRupee } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface MedicineTableProps {
  filteredMedicines: Medicine[];
  onEditMedicine: (medicine: Medicine) => void;
  onDeleteMedicine: (medicine: Medicine) => void;
}

const MedicineTable: React.FC<MedicineTableProps> = ({ 
  filteredMedicines, 
  onEditMedicine, 
  onDeleteMedicine 
}) => {
  return (
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
                      onClick={() => onEditMedicine(medicine)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDeleteMedicine(medicine)}
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
  );
};

export default MedicineTable;
