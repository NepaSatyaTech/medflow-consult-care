
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Initialize Google Map
    const initMap = () => {
      const mapDiv = document.getElementById('google-map');
      if (!mapDiv || !window.google) return;
      
      // Coordinates for Krishnagar Municipality, Bahadurjung, Kapilvastu, Nepal
      const krishnagarCoords = { lat: 27.5480, lng: 83.0758 };
      
      const map = new google.maps.Map(mapDiv, {
        center: krishnagarCoords,
        zoom: 15,
        mapTypeControl: true,
        fullscreenControl: true,
      });
      
      // Add marker for Krishnagar Municipality
      new google.maps.Marker({
        position: krishnagarCoords,
        map,
        title: "Krishnagar Municipality, Bahadurjung, Kapilvastu, Nepal"
      });
    };
    
    // Load Google Maps API
    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initGoogleMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      window.initGoogleMap = initMap;
      document.head.appendChild(googleMapScript);
    } else {
      initMap();
    }
    
    return () => {
      // Clean up the global callback
      window.initGoogleMap = undefined;
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center mb-10 fade-in-element">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Access</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Login to the admin panel to manage medicines and appointments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="fade-in-element" style={{ animationDelay: '200ms' }}>
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
            
            <div className="fade-in-element" style={{ animationDelay: '300ms' }}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <h3 className="bg-medflow-blue text-white p-4 font-medium">Our Location</h3>
                <div id="google-map" className="w-full h-[400px]"></div>
                <div className="bg-white p-4">
                  <h4 className="font-medium mb-2">Krishnagar Municipality</h4>
                  <p className="text-gray-600">Bahadurjung, Kapilvastu, Nepal</p>
                </div>
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
