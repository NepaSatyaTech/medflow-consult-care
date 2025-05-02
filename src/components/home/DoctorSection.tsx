
import React from 'react';
import { doctorInfo } from '@/data/mockData';

const DoctorSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Doctor</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Providing expert medical care and personalized consultations to help you maintain optimal health.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 fade-in-element">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={doctorInfo.imageUrl} 
                alt={doctorInfo.name} 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 fade-in-element" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl font-bold text-medflow-blue mb-3">{doctorInfo.name}</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Qualifications:</span> {doctorInfo.qualifications}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Experience:</span> {doctorInfo.experience}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Specialization:</span> {doctorInfo.specialization}
              </p>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{doctorInfo.bio}</p>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-medflow-blue">
              <blockquote className="italic text-gray-700">
                "My goal is to provide comprehensive healthcare that treats the whole person, not just the symptoms. I believe in partnering with my patients on their health journey."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
