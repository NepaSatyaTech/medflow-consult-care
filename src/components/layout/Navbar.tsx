
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-2xl text-medflow-blue">MedFlow</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-medflow-blue transition-colors">
            Home
          </Link>
          <Link to="/medicines" className="font-medium text-gray-700 hover:text-medflow-blue transition-colors">
            Medicines
          </Link>
          <Link to="/appointment" className="font-medium text-gray-700 hover:text-medflow-blue transition-colors">
            Book Appointment
          </Link>
          <Link to="/contact" className="font-medium text-gray-700 hover:text-medflow-blue transition-colors">
            Contact
          </Link>
          <Link to="/login">
            <Button className="bg-medflow-blue hover:bg-medflow-blue-dark">
              Login / Register
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" 
              className="block font-medium text-gray-700 hover:text-medflow-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link to="/medicines" 
              className="block font-medium text-gray-700 hover:text-medflow-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Medicines
            </Link>
            <Link to="/appointment" 
              className="block font-medium text-gray-700 hover:text-medflow-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
            <Link to="/contact" 
              className="block font-medium text-gray-700 hover:text-medflow-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-medflow-blue hover:bg-medflow-blue-dark">
                Login / Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
