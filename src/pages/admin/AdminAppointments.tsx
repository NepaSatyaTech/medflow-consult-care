
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AppointmentList from '@/components/admin/AppointmentList';
import { Appointment, AppointmentStatus } from '@/types';
import { appointments as initialAppointments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Load appointments from localStorage if available
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      try {
        const parsedAppointments = JSON.parse(storedAppointments);
        setAppointments(parsedAppointments);
        console.log('Loaded appointments from localStorage:', parsedAppointments.length);
      } catch (error) {
        console.error('Error parsing appointments from localStorage:', error);
      }
    }
  }, []);

  const handleStatusChange = (appointmentId: string, status: AppointmentStatus) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status } 
        : appointment
    );
    
    setAppointments(updatedAppointments);
    
    // Save updated appointments to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    toast({
      title: `Appointment ${status}`,
      description: `Appointment has been ${status} successfully.`,
    });
  };
  
  const filteredAppointments = statusFilter === 'all'
    ? appointments
    : appointments.filter(appointment => appointment.status === statusFilter);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <span className="mr-3 text-gray-700 font-medium">Filter by Status:</span>
                <select
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-medflow-blue focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No appointments found matching the selected filter.
                </div>
              ) : (
                <AppointmentList 
                  appointments={filteredAppointments} 
                  onStatusChange={handleStatusChange} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAppointments;
