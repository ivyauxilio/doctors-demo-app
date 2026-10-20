"use client"
import React, { useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
// import { useDispatch, useSelector } from "react-redux";
import { createMedicalCertificate } from "@/store/slices/medicalCertificateSlice";
import { useReactToPrint } from "react-to-print";
import Swal from 'sweetalert2';
import Image from "next/image";
const MedicalEditor: React.FC = () => {

const [patientName, setPatientName] = useState("");
const [age, setAge] = useState<string>("");
const [issue_date, setIssueDate] = useState( new Date().toISOString().split("T")[0]);
  const [impression, setImpression] = useState("");
  const [reason, setReason] = useState("");
const dispatch = useAppDispatch();
// const { saved, loading } = useSelector(state => state.medical);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const handlePrintAndSave = async () => {
  
  const result = await dispatch(createMedicalCertificate({
    patients_name: patientName,
    age,
    issue_date,
    impression,
    reason
  }));
    // Swal.fire({ icon: 'success', title: 'Medical Certificate', text: 'Created successfully.' });
    if (createMedicalCertificate.fulfilled.match(result)) { 
        const resultSuccess = await Swal.fire({
            title: 'Medical Certificate',
            text: 'Created successfully.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Print',
          });
      
        if (resultSuccess.isConfirmed) {
            reactToPrintFn?.(); // print after save
        }
         } else {
           // alert("Failed to save prescription.");
           Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
         }
  };

  return (
    <div className="p-2 md:p-4 max-w-4xl mx-auto">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={handlePrintAndSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save & Print
        </button>
      </div>

      {/* Prescription Content */}
      <div className="rounded-lg shadow-lg">
      <div ref={contentRef} className="bg-white p-5 md:p-10 print-a4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Dr. Surgical & Medical Clinic</h1>
          <p className="text-sm">Daet Medical Plaza, Bagasbas Road, Daet, Camarines Norte</p>
          <p className="text-sm">Contact No. (+63) 928-5000-298</p>
          {/* <hr className="my-2 border-t-4 border-gray-300" /> */}
        </div>

        <h2 className="text-3xl font-bold text-center mb-10" style={{marginBottom: "50px", marginTop: "50px"}} >CERTIFICATION</h2>

          
        <div className="flex justify-start text-right items-center mt-10 mb-4 space-x-4">
          <label
            htmlFor="name"
            className="text-sm font-medium whitespace-nowrap"
          >
            Date: 
          </label>
          <input
            type="date"
              id="issue_date"
              value={issue_date} onChange={(e) => setIssueDate(e.target.value)}
            className="border-b border-gray-400 focus:outline-none 
            focus:border-blue-600 px-2 py-1 bg-transparent"
            placeholder="Enter your name"
          />
        </div>

      <div className="flex items-center flex-wrap mt-10">

        <p>This is to certify that </p>
           <input
          type="text"
              id="name"
              value={patientName} onChange={(e) => setPatientName(e.target.value)}
          className="flex-1 border-b border-gray-400 focus:outline-none 
          focus:border-blue-600 px-2 py-1 bg-transparent"
          placeholder="Enter your name"
            /> 
            <p className="flex mt-5">, </p>
          <div className="flex items-center space-x-2 min-w-[120px]">
            <input
              type="text"
                id="age"
                value={age} onChange={(e) => setAge(e.target.value)}
              className="w-20 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              placeholder="Age"
              />
           <label htmlFor="age" className="text-sm font-medium whitespace-nowrap">
              years old, has 
            </label>
              <br />
             
            </div>
            <p>been seen and examined in my clinic for</p>
           <input
          type="text"
              id="reason"
              value={reason} onChange={(e) => setReason(e.target.value)}
          className="flex-1 border-b border-gray-400 focus:outline-none 
          focus:border-blue-600 px-2 py-1 bg-transparent"
          placeholder="ex. Medical Check-up"
            /> 
      </div>

        <div className="flex flex-wrap gap-6 mb-1">
  
        </div>


        <div className="mt-20 pl-5 my-6">
          <label className="block text-sm font-medium">Impression:</label>
          <textarea
            className="w-full focus:outline-none border-b border-none
            focus:border-blue-600 px-2 py-1 bg-transparent resize-none h-60"
            placeholder="Enter impression details "
            value={impression} onChange={(e) => setImpression(e.target.value)}
          />
        </div>

          <p>This certification was issued for whatever purpose it my serve him/her.</p>
          <p className="mt-10">Thank you very much.</p>

        <div className="flex justify-start mt-20">
            <div className="flex flex-col text-justify text-sm max-w-xs">
               {/* <Image
                                    className="w-45 h-auto "
                                    src="/images/signature/drenesionsignature-1.png"
                alt="Logo"
                                      width={160}
                      height={132}
                                  /> */}
            <h4 className="text-based font-bold">Doctor, M.D.</h4>
              <p>Lic. No. <span className="underline font-bold">____xxxxx_____</span></p>
              {/* <p>S2  <strong>___________________</strong></p> */}
              {/* <p>PTR<strong>__________________</strong></p> */}
                      <div className="flex items-center space-x-2 min-w-[120px]">
               <label htmlFor="ptr" className="text-sm font-medium whitespace-nowrap">
             PTR
              </label>
             
            <input
              type="text"
                id="ptr"
              className="w-30 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              />
         
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MedicalEditor;
