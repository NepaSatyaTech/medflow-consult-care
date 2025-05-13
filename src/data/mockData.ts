
import { Medicine, Appointment } from '@/types';

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    imageUrl: '/paracetamol500.jpeg',
    category: 'Pain Relief',
    description: 'Effective pain reliever and fever reducer for adults and children.',
    price: 5.99,
    inStock: true
  },
  {
    id: '2',
    name: 'Cold Relief Max',
    imageUrl: '/placeholder.svg',
    category: 'Cold & Flu',
    description: 'Fast relief for cold and flu symptoms including congestion, fever, and cough.',
    price: 8.49,
    inStock: true
  },
  {
    id: '3',
    name: 'Digestive Health Plus',
    imageUrl: '/placeholder.svg',
    category: 'Digestive',
    description: 'Supports healthy digestion and helps relieve occasional stomach discomfort.',
    price: 12.99,
    inStock: true
  },
  {
    id: '4',
    name: 'Multivitamin Daily',
    imageUrl: '/multivatimin.jpg',
    category: 'Vitamins',
    description: 'Complete daily multivitamin formula with essential nutrients for overall health.',
    price: 15.99,
    inStock: true
  },
  {
    id: '5',
    name: 'First Aid Antiseptic',
    imageUrl: '/first.jpg',
    category: 'First Aid',
    description: 'Helps prevent infection in minor cuts, scrapes, and burns.',
    price: 6.49,
    inStock: true
  },
  {
    id: '6',
    name: 'Allergy Relief Tablets',
    imageUrl: '/allergy.jpg',
    category: 'Allergy',
    description: '24-hour non-drowsy relief from seasonal allergies and hay fever symptoms.',
    price: 14.99,
    inStock: true
  },
  {
    id: '7',
    name: 'Glucose Monitor Strips',
    imageUrl: '/gulcose.jpg',
    category: 'Diabetes',
    description: 'Compatible test strips for blood glucose monitoring.',
    price: 24.99,
    inStock: false
  },
  {
    id: '8',
    name: 'Heart Health Omega-3',
    imageUrl: '/heart.jpg',
    category: 'Heart Health',
    description: 'Supports cardiovascular health with premium omega-3 fatty acids.',
    price: 19.99,
    inStock: true
  }
];

export const categories = [
  'All Categories',
  'Cold & Flu',
  'Pain Relief',
  'Digestive',
  'Vitamins',
  'First Aid',
  'Allergy',
  'Diabetes',
  'Heart Health'
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    consultationType: 'in-person',
    date: '2025-05-10',
    time: '10:00',
    reason: 'Annual check-up',
    status: 'approved',
    patientEmail: 'john.doe@example.com',
    patientPhone: '123-456-7890'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    consultationType: 'virtual',
    date: '2025-05-12',
    time: '14:30',
    reason: 'Headache and fever',
    status: 'pending',
    patientEmail: 'jane.smith@example.com',
    patientPhone: '234-567-8901'
  }
];

export const doctorInfo = {
  name: 'Dr. Sarah Johnson',
  qualifications: 'MD, Ph.D., Board Certified in Internal Medicine',
  experience: '15+ years',
  specialization: 'General Medicine, Preventive Healthcare',
  bio: 'Dr. Sarah Johnson is a highly respected physician with over 15 years of experience in general and internal medicine. She is passionate about preventive healthcare and providing personalized care to her patients. Dr. Johnson completed her medical education at Harvard Medical School and her residency at Johns Hopkins Hospital.',
  imageUrl: '/kamlesh.jpg'
};

export const statsData = [
  { label: 'Medicines Available', value: 500 },
  { label: 'Happy Patients', value: 5000 },
  { label: 'Years of Service', value: 15 },
  { label: 'Expert Staff', value: 20 }
];
