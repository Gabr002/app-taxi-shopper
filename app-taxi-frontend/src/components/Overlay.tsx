import Lottie from 'lottie-react';
import React from 'react';
import driverAnimation from '../assets/animations/driver.json';
interface OverlayProps {
  message: string;
  isLoading: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ message, isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex-col p-6  flex items-center space-x-4">
      <Lottie animationData={driverAnimation} loop={true} style={{ width: 500, height: 500 }}/>
      
        <span className="text-6xl text-white">{message}</span>
      </div>
    </div>
  );
};

export default Overlay;
