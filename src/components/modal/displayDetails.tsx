'use client';

import React, { useRef , useEffect,useState } from 'react';
import { PatientData } from '@/lib/api';
import Registration from '../ecommerce/RegistrationForm';
import AddProgressNote from '@/app/(admin)/(others-pages)/patients/AddprogressNote';
import ProgressNoteViewer from '@/app/(admin)/(others-pages)/patients/ViewProgressNote';
import getAge from '@/app/(admin)/(others-pages)/patients/getPatientAge';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData | null;
  tabs: Tab[];
  userId: number;
}
interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function displayPatientModal({ isOpen, onClose, patient,tabs,userId    }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showFormProgressNote, setShowFormProgressNote] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [age, setAge] = useState('');
  const currentTab = tabs.find((tab) => tab.id === activeTab);
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
  
  	const calculateAge = (selectedDate:any) => {
      if (!selectedDate) {
        setAge('');
        return;
      }

      const today = new Date();
      const birthdate = new Date(selectedDate);
      let calculatedAge = today.getFullYear() - birthdate.getFullYear();
      const monthDifference = today.getMonth() - birthdate.getMonth();
      const dayDifference = today.getDate() - birthdate.getDate();

      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        calculatedAge--;
      }

      setAge(`${calculatedAge}`);
    };
  
  if (!isOpen) return null;
  
  return (
    <div id="showPatient" className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40" onClick={handleOutsideClick}>
      <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 relative w-full max-w-3xl mx-4 sm:mx-6 md:mx-auto max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6 animate-fadeIn">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Patient Details</h2>
        <div className="flex border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 -mb-px border-b-2 ${
                activeTab === tab.id
                  ? "bg-green-200 border-blue-500 text-blue-500 font-semibold"
                  : "border-transparent text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.title}
            </button>
          ))}
          
        </div>
        <div className="text-gray-800">{currentTab?.content}</div>
        {currentTab?.content === "Patient" ? 
        <Table>
          <TableHeader className="bg-gray-100 border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader
                  className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    -
              </TableCell>
                            <TableCell isHeader
                  className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Details
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Name:
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.first_name} {patient?.middle_name} {patient?.last_name}</p>
              </TableCell>
              </TableRow>
              <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Birthdate: 
              </TableCell>
              <TableCell className="px-4 py-3  text-start text-theme-sm dark:text-gray-400">
                  {patient?.birthdate ? new Date(patient.birthdate).toLocaleDateString() : 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Age: 
              </TableCell>
              <TableCell className="px-4 py-3  text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.birthdate 
                        ? getAge(patient?.birthdate)
                        : "N/A"}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Sex: 
              </TableCell>
              <TableCell className="px-4 py-3  text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.sex}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Address:  
              </TableCell>
              <TableCell className="px-4 py-3  text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.address}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Contact Number: 
              </TableCell>
              <TableCell className="px-4 py-3  text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.telephone_number}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Chief Complaint: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.chief_complaint}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                HPI: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.hpi}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                ROS: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.ros}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                PMHx: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.pmhx}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                PE: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.pe}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Laboratories/Diagnostics:  
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.lab_diagnostic}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Impression:  
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.impression}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Treatment Plan: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.treatment_plan}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Surgical Procedure:  
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.surgical_procedure}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Date of Surgery: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
               <p></p> {/* <p>{patient?.surgery_date ? new Date(patient.surgery_date).toLocaleDateString() : ''}</p> */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                Place of Surgery: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.surgery_place}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                OR Findings: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.on_findings}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                HISTOPATH: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.histopath}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                ANESTHESIOLOGIST: 
              </TableCell>
              <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                <p>{patient?.anesthesiologist}</p>
              </TableCell>
            </TableRow>
          </TableBody>
          </Table>
          : (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowFormProgressNote((prev) => !prev)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {showFormProgressNote ? 'Back to List' : 'Add Progress Note'}
                </button>
              </div>
              {showFormProgressNote ? <AddProgressNote patientId={patient?.id as number} doctorId={userId as number} /> :
               <ProgressNoteViewer patientId={patient?.id as number} /> }
              </>)}
          {/* // : <AddProgressNote patientId={patient?.id as number} doctorId={userId as number} /> } */}
      </div> 
    </div> 
  )
}