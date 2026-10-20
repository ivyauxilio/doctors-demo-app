'use client';

import React, { useRef , useEffect } from 'react';
import { PatientData } from '@/lib/api';
import Registration from '../ecommerce/RegistrationForm';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData | null;
  onSave: (updated: PatientData) => void;
}

export default function EditPatientModal({ isOpen, onClose, patient, onSave }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  
  if (!isOpen) return null;

  return (
    <div id="editPatient" className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40" onClick={handleOutsideClick}>
      <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 relative w-full max-w-3xl mx-4 sm:mx-6 md:mx-auto max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6 animate-fadeIn">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Edit Patient</h2>

        <Registration patient={patient}/>
    
      </div> 
    </div> 
  );
}