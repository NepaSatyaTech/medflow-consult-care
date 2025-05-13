
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-medflow-blue to-medflow-blue-light text-white">
      <div className="container-custom min-h-[80vh] flex flex-col md:flex-row items-center justify-between py-20">
        <div className="md:w-1/2 mb-10 md:mb-0 fade-in-element">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('yourHealth')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            MedFlow brings together expert medical consultations and pharmacy services 
            in one seamless experience. Get the care you deserve, whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/medicines">
              <Button className="bg-white text-medflow-blue hover:bg-gray-100 text-lg px-8 py-6 rounded-full">
                {t('browseMedicines')}
              </Button>
            </Link>
            <Link to="/appointment">
              <Button className="bg-medflow-green hover:bg-medflow-green-dark text-lg px-8 py-6 rounded-full">
                {t('bookAppointment')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 fade-in-element" style={{ animationDelay: '200ms' }}>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-medflow-green/30 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <img 
              src="/placeholder.svg" 
              alt="Doctor and Pharmacist" 
              className="rounded-2xl relative z-10 shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
