import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-black/50 p-10"
      onClick={onClose}
    >
      <div>
      <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 bg-white rounded-full p-2"
          onClick={onClose}
        >
          <X size={24} className='text-red-500'/>
        </button>
      </div>
      <div
        className="bg-white rounded-lg max-h-full p-6 shadow-lg relative w-full max-w-6xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

      </div>

    </div>
  );
};

export default Modal;