
export interface Medicine {
  id: string;
  name: string;
  imageUrl: string;
  category: MedicineCategory;
  description: string;
  price: number;
  inStock: boolean;
}

export type MedicineCategory = 
  | 'Cold & Flu'
  | 'Pain Relief'
  | 'Digestive'
  | 'Vitamins'
  | 'First Aid'
  | 'Allergy'
  | 'Diabetes'
  | 'Heart Health';

export interface Appointment {
  id: string;
  patientName: string;
  consultationType: 'in-person' | 'virtual';
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  patientEmail?: string;
  patientPhone?: string;
}

export type AppointmentStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'patient' | 'admin';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
