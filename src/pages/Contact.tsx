import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';

// Define types for Google Maps
declare global {
  interface Window {
    google: any;
    initContactMap: () => void;
  }
}

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize Google Map
    const initMap = () => {
      const mapDiv = document.getElementById('contact-google-map');
      if (!mapDiv || !window.google) return;
      
      // Coordinates for Krishnagar Municipality, Bahadurjung, Kapilvastu, Nepal
      const krishnagarCoords = { lat: 27.5480, lng: 83.0758 };
      
      const map = new window.google.maps.Map(mapDiv, {
        center: krishnagarCoords,
        zoom: 15,
        mapTypeControl: true,
        fullscreenControl: true,
      });
      
      // Add marker for Krishnagar Municipality
      new window.google.maps.Marker({
        position: krishnagarCoords,
        map,
        title: "Krishnagar Municipality, Bahadurjung, Kapilvastu, Lumbini, Nepal"
      });
    };
    
    // Load Google Maps API
    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initContactMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      window.initContactMap = initMap;
      document.head.appendChild(googleMapScript);
    } else {
      initMap();
    }
    
    return () => {
      // Clean up the global callback
      window.initContactMap = undefined;
    };
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
                        Krishnagar Municipality<br />
                        Bahadurjung, Kapilvastu, Lumbini, Nepal
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
                      <p className="text-gray-600 mt-1">Main:076-590012</p>
                      <p className="text-gray-600">Support:9848117088</p>
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
                      <p className="text-gray-600 mt-1">info@sewamedical.com</p>
                      <p className="text-gray-600">sewamedical@gmail.com</p>
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
                <div id="contact-google-map" className="w-full h-[300px]"></div>
                <div className="bg-white p-4">
                  <h4 className="font-medium mb-2">Krishnagar Municipality</h4>
                  <p className="text-gray-600">Bahadurjung, Kapilvastu, Lumbini, Nepal</p>
                </div>
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
