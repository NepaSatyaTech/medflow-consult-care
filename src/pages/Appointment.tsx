
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import { doctorInfo } from '@/data/mockData';

const Appointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-10">
          <div className="text-center mb-10 fade-in-element">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book an Appointment</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Schedule a consultation with our experienced doctor for personalized healthcare advice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 fade-in-element">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={doctorInfo.imageUrl} 
                    alt={doctorInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-medflow-blue mb-2">{doctorInfo.name}</h2>
                  <p className="text-gray-600 mb-4">{doctorInfo.specialization}</p>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold text-gray-900">Qualifications:</span> {doctorInfo.qualifications}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold text-gray-900">Experience:</span> {doctorInfo.experience}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-medflow-blue">
                    <h3 className="font-medium mb-2">Working Hours</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday:</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 fade-in-element" style={{ animationDelay: '200ms' }}>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointment;
