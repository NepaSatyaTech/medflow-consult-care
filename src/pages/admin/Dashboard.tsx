
import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { medicines, appointments } from '@/data/mockData';

const Dashboard = () => {
  // Calculate basic statistics
  const totalMedicines = medicines.length;
  const medicinesInStock = medicines.filter(med => med.inStock).length;
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(appt => appt.status === 'pending').length;
  
  // Get medicines by category
  const medicinesByCategory: Record<string, number> = {};
  medicines.forEach(medicine => {
    if (medicinesByCategory[medicine.category]) {
      medicinesByCategory[medicine.category]++;
    } else {
      medicinesByCategory[medicine.category] = 1;
    }
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Last updated: May 2, 2025</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalMedicines}</div>
                <p className="text-sm text-gray-500 mt-1">
                  {medicinesInStock} in stock ({((medicinesInStock / totalMedicines) * 100).toFixed(0)}%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalAppointments}</div>
                <p className="text-sm text-gray-500 mt-1">
                  {pendingAppointments} pending
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{Object.keys(medicinesByCategory).length}</div>
                <p className="text-sm text-gray-500 mt-1">
                  Medicine categories
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Revenue (Demo)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,450</div>
                <p className="text-sm text-green-500 mt-1">
                  ↑ 12% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicines.slice(0, 5).map((medicine) => (
                    <div key={medicine.id} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img 
                          src={medicine.imageUrl} 
                          alt={medicine.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm text-gray-500">{medicine.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{medicine.price.toFixed(2)}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full {medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={() => window.location.href = '/admin/medicines'}
                >
                  View All Medicines
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <span className="font-medium text-gray-700">
                          {appointment.patientName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="capitalize text-sm">{appointment.consultationType}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={() => window.location.href = '/admin/appointments'}
                >
                  View All Appointments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
