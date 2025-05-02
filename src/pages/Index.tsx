
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import DoctorSection from '@/components/home/DoctorSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { medicines } from '@/data/mockData';

const Index = () => {
  // Featured medicines (just take a few for the homepage)
  const featuredMedicines = medicines.slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <HeroSection />
        
        {/* Featured Medicines Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12 fade-in-element">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Medicines</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our selection of top-quality medicines and healthcare products.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {featuredMedicines.map((medicine, index) => (
                <div 
                  key={medicine.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden fade-in-element"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={medicine.imageUrl} 
                      alt={medicine.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-blue-50 text-medflow-blue text-xs py-1 px-2 rounded-full">
                        {medicine.category}
                      </span>
                      <span className="font-semibold">${medicine.price.toFixed(2)}</span>
                    </div>
                    <h3 className="font-medium mb-1">{medicine.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{medicine.description}</p>
                    <Button 
                      className="w-full bg-medflow-blue hover:bg-medflow-blue-dark"
                      disabled={!medicine.inStock}
                    >
                      {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center fade-in-element" style={{ animationDelay: '400ms' }}>
              <Link to="/medicines">
                <Button className="bg-medflow-blue-light hover:bg-medflow-blue text-lg px-8 py-6">
                  View All Medicines
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <DoctorSection />
        
        <StatsSection />
        
        <FeaturedCategories />
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-medflow-blue-dark to-medflow-blue">
          <div className="container-custom text-center text-white">
            <div className="max-w-3xl mx-auto fade-in-element">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Book an appointment with our experienced doctor or browse our wide range of quality medicines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/appointment">
                  <Button className="bg-white text-medflow-blue hover:bg-gray-100 text-lg px-8 py-6 rounded-full">
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/medicines">
                  <Button className="bg-medflow-green hover:bg-medflow-green-dark text-lg px-8 py-6 rounded-full">
                    Browse Medicines
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
