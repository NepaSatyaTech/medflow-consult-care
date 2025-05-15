import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import KeyServicesSection from '@/components/home/KeyServicesSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import DoctorSection from '@/components/home/DoctorSection';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const { toast } = useToast();
  
  const handleAppointmentButtonClick = () => {
    toast({
      title: "Booking appointment",
      description: "Redirecting to appointment page",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <HeroSection />

      <KeyServicesSection />

      <StatsSection />

      <FeaturedCategories />

      <DoctorSection />

      <section className="bg-gray-50 py-12">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Ready to experience MedFlow?
          </h2>
          <p className="text-gray-600 mb-8">
            Book an appointment today and take the first step towards better health.
          </p>
          <Button onClick={handleAppointmentButtonClick} className="bg-medflow-blue hover:bg-medflow-blue-dark">
            <CalendarDays className="mr-2" />
            Book Appointment
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
