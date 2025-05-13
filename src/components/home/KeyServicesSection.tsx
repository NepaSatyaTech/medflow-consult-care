
import React from 'react';
import { Activity, Check, Syringe, Scissors, TestTube, Heart, Baby, Stethoscope, Info, Link } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Service = {
  icon: React.ReactNode;
  title: string;
};

const KeyServicesSection = () => {
  const { t } = useLanguage();
  
  const services: Service[] = [
    { icon: <Check className="w-5 h-5 text-medflow-blue" />, title: "Diagnosis & Treatment of Common Illnesses" },
    { icon: <Activity className="w-5 h-5 text-medflow-blue" />, title: "Routine Checkups & Preventive Health Screenings" },
    { icon: <Syringe className="w-5 h-5 text-medflow-blue" />, title: "Vaccinations & Immunizations" },
    { icon: <Check className="w-5 h-5 text-medflow-blue" />, title: "Prescription & Medication Management" },
    { icon: <Scissors className="w-5 h-5 text-medflow-blue" />, title: "Minor Surgical Procedures & Basic Operations" },
    { icon: <Activity className="w-5 h-5 text-medflow-blue" />, title: "X-ray & Basic Radiology Services" },
    { icon: <TestTube className="w-5 h-5 text-medflow-blue" />, title: "On-site Laboratory Testing" },
    { icon: <Heart className="w-5 h-5 text-medflow-blue" />, title: "Chronic Disease Management (Diabetes, Hypertension, etc.)" },
    { icon: <Heart className="w-5 h-5 text-medflow-blue" />, title: "Women's Health & Wellness" },
    { icon: <Baby className="w-5 h-5 text-medflow-blue" />, title: "Pediatric & Elderly Care" },
    { icon: <Stethoscope className="w-5 h-5 text-medflow-blue" />, title: "Emergency First Aid" },
    { icon: <Info className="w-5 h-5 text-medflow-blue" />, title: "Health Education & Counseling" },
    { icon: <Link className="w-5 h-5 text-medflow-blue" />, title: "Referrals to Medical Specialists" },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12 fade-in-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('keyServices')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare services to meet all your medical needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm fade-in-element flex items-start"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mr-3 mt-1">{service.icon}</div>
              <p className="text-gray-800">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyServicesSection;
