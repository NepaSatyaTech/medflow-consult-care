
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center mb-10 fade-in-element">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Account Access</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Login to your account or create a new one to access personalized features.
            </p>
          </div>
          
          <div className="max-w-md mx-auto fade-in-element" style={{ animationDelay: '200ms' }}>
            <AuthForm />
            
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Admin Access</h3>
                <p className="text-gray-600 text-sm">
                  For demo purposes: Use email <span className="font-medium">admin@medflow.com</span> 
                  and password <span className="font-medium">admin123</span> to access the admin panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
