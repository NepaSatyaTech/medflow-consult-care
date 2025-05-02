
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-10">
          <div className="text-center mb-10 fade-in-element">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 fade-in-element">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-medflow-blue mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-50 text-medflow-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Our Location</h3>
                      <address className="not-italic text-gray-600 mt-1">
                        123 Healthcare Avenue<br />
                        Medical District, MD 10010
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-50 text-medflow-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Contact Numbers</h3>
                      <p className="text-gray-600 mt-1">Main: (123) 456-7890</p>
                      <p className="text-gray-600">Support: (123) 456-7891</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-50 text-medflow-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600 mt-1">info@medflow.com</p>
                      <p className="text-gray-600">support@medflow.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-50 text-medflow-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Working Hours</h3>
                      <p className="text-gray-600 mt-1">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden fade-in-element" style={{ animationDelay: '300ms' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059412374!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1588100597531!5m2!1sen!2s" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}
                  allowFullScreen={true} 
                  loading="lazy"
                  title="MedFlow Location"
                ></iframe>
              </div>
            </div>
            
            <div className="lg:col-span-3 fade-in-element" style={{ animationDelay: '200ms' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
