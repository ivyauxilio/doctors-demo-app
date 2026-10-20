"use client"
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPrescription } from "@/store/slices/prescriptionSlice";
import { useReactToPrint } from "react-to-print";
import Swal from 'sweetalert2';
import Image from "next/image";

const PrescriptionEditor: React.FC = () => {

const dispatch = useDispatch();
const contentRef = useRef<HTMLDivElement>(null);
const reactToPrintFn = useReactToPrint({ contentRef });
  const [printSize, setPrintSize] = useState<"A4" | "A5">("A5");
  
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    sex: "",
    patient_id: "", // optional if you're referencing a user
    medication: "",
    dosage: "",
    instructions: "",
    date_prescribed: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handlePrintAndSave = async () => {
    const result = await dispatch(createPrescription(form) as any);

    if (createPrescription.fulfilled.match(result)) {
      setPrintSize("A5")
          const resultSuccess = await Swal.fire({
              title: 'Prescription',
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
      <div ref={contentRef} className={`bg-white md:p-10 p-5 a5-print ${printSize === "A4" ? "print-a4" : "print-a5"}`}>
        <div className="text-center mb-4">
          <h1 className="header-print text-2xl font-bold">Dr. Emmanuel Enesio Surgical & Medical Clinic</h1>
          <p className="text-sm">Daet Medical Plaza, Bagasbas Road, Daet, Camarines Norte</p>
          <p className="text-sm">Contact No. (+63) 928-5000-298</p>
          <hr className="my-2 border-t-4 border-gray-300" />
        </div>

      <div className="demographics-row flex flex-col md:flex-row md:items-center mb-4">
        <label
          htmlFor="name"
          className="text-sm font-medium whitespace-nowrap"
        >
          Name of Patient:
        </label>
        <input
          type="text"
          id="name"
          value={form.name} onChange={handleChange}
          className="flex-1 border-b border-gray-400 focus:outline-none 
          focus:border-blue-600 px-2 py-1 bg-transparent"
          placeholder="Enter your name"
        />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-4">
        {/* Address (own row) */}
        <div className="demographics-row flex flex-col md:flex-row items-start md:items-center md:flex-1 address-row">
          <label htmlFor="address" className="text-sm font-medium whitespace-nowrap">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={form.address}
            onChange={handleChange}
            className="w-full md:w-50 flex-1 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
            placeholder="Enter address"
          />
        </div>

        {/* Age, Sex, Date (same row in print) */}
        <div className="demographics-row flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2 min-w-[120px]">
            <label htmlFor="age" className="text-sm font-medium whitespace-nowrap">
              Age:
            </label>
            <input
              type="number"
              value={form.age}
              onChange={handleChange}
              id="age"
              className="w-full md:w-20 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              placeholder="Age"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="sex" className="text-sm font-medium whitespace-nowrap">
              Sex:
            </label>
            <select
              id="sex"
              value={form.sex}
              onChange={handleChange}
              className="w-full md:w-auto border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex items-center gap-2 justify-end date-row">
            <label htmlFor="date_prescribed" className="text-sm font-medium whitespace-nowrap">
              Date:
            </label>
            <input
              id="date_prescribed"
              value={form.date_prescribed}
              onChange={handleChange}
              type="date"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
            />
          </div>
        </div>
      </div>

        
        <div className="flex flex-row items-start">
          <div className="md:pl-5 pl-2 mt-1 flex-shrink-0">
            <span className="text-6xl font-bold text-black select-none">℞</span>
          </div>

          <div className="w-[90%] my-6 md:pl-5 pl-2">
              <textarea
                id="instructions" value={form.instructions} onChange={handleChange}
              className="w-full focus:outline-none border-b border-gray-100
              focus:border-blue-600 px-2 py-1 bg-transparent resize-none h-60 prescription-textarea"
              placeholder="Enter diagnosis details "
            />
          </div>
        </div>

        <div className="flex justify-end mt-10 signature-block">
            <div className="flex flex-col text-justify text-sm max-w-xs relative mt-6">
              {/* <Image
                className="w-40 h-auto absolute -top-13 left-0 opacity-80 pointer-events-none "
                src="/images/signature/drenesionsignature-2.png"
                alt="Logo"
                width={140}
                height={132}
              /> */}
            <h4 className="text-based font-bold">Name of the Doctor</h4>
            <p>Lic. No. <span className="underline font-bold">____xxxxx_____</span></p>
            <div className="flex items-center space-x-2 min-w-[120px]">
               <label htmlFor="ptr" className="text-sm font-medium whitespace-nowrap">
             PTR
              </label>
             
            <input
              type="text"
                id="ptr"
              className="input-ptr w-30 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              />
         
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PrescriptionEditor;
