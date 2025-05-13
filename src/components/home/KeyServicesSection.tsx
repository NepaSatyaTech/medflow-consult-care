
import React from 'react';
import { Activity, Check, Syringe, Scissors, TestTube, Heart, Baby, Stethoscope, Info, Link } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

type Service = {
  icon: React.ReactNode;
  title: string;
};

const KeyServicesSection = () => {
  const { t } = useLanguage();
  
  const services: Service[] = [
    { icon: <Check className="w-6 h-6 text-white" />, title: "Diagnosis & Treatment of Common Illnesses" },
    { icon: <Activity className="w-6 h-6 text-white" />, title: "Routine Checkups & Preventive Health Screenings" },
    { icon: <Syringe className="w-6 h-6 text-white" />, title: "Vaccinations & Immunizations" },
    { icon: <Check className="w-6 h-6 text-white" />, title: "Prescription & Medication Management" },
    { icon: <Scissors className="w-6 h-6 text-white" />, title: "Minor Surgical Procedures & Basic Operations" },
    { icon: <Activity className="w-6 h-6 text-white" />, title: "X-ray & Basic Radiology Services" },
    { icon: <TestTube className="w-6 h-6 text-white" />, title: "On-site Laboratory Testing" },
    { icon: <Heart className="w-6 h-6 text-white" />, title: "Chronic Disease Management (Diabetes, Hypertension, etc.)" },
    { icon: <Heart className="w-6 h-6 text-white" />, title: "Women's Health & Wellness" },
    { icon: <Baby className="w-6 h-6 text-white" />, title: "Pediatric & Elderly Care" },
    { icon: <Stethoscope className="w-6 h-6 text-white" />, title: "Emergency First Aid" },
    { icon: <Info className="w-6 h-6 text-white" />, title: "Health Education & Counseling" },
    { icon: <Link className="w-6 h-6 text-white" />, title: "Referrals to Medical Specialists" },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t('keyServices')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide comprehensive healthcare services to meet all your medical needs
          </p>
          <div className="mt-6 w-20 h-1 bg-medflow-blue mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={cn(
                "rounded-xl shadow-md transition-all duration-300 hover:shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-1 fade-in-element",
                "flex flex-col"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-gradient-to-r from-medflow-blue to-medflow-blue-light p-4 flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">{service.icon}</div>
                <h3 className="font-medium text-white">{service.title}</h3>
              </div>
              <div className="p-5 bg-white flex-grow">
                <p className="text-gray-600">
                  ✅ {service.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyServicesSection;
