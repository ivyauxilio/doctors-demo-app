'use client'; // if using app directory

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { format, parseISO } from 'date-fns';
import jsPDF from 'jspdf';

export default function Medical() {
  const [formData, setFormData] = useState({
    name: '',
    diagnosis: '',
    doctor: 'Name of the Doctor',
    date: format(new Date(), 'yyyy-MM-dd'),
    age: '',
    licence: '88510',
  });

  const certRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    if (certRef.current) {
      const canvas = await html2canvas(certRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = 210;
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('medical-certificate.pdf');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* <h1 className="text-2xl font-bold">Medical Certificate Editor</h1> */}

      <form className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Patient Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Patient Age"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis / Medical Condition"
          className="w-full p-2 border rounded"
        />
        <input
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Doctor's Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="licence"
          value={formData.licence}
          onChange={handleChange}
          placeholder="Doctor's Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </form>

      <div className='border rounded bg-white shadow '>
          <div ref={certRef} className="p-10 print:border-none print:shadow-none" style={{margin: "50px 60px"}}>
            <h1 className="text-2xl font-bold text-center mb-4">DR. SURGICAL & MEDICAL CLINIC</h1>
            <h3 className="text-sm text-center mb-0">Bagasbas Road, 4600 Daet, Camarines Norte</h3>
            <h3 className="text-sm text-center mb-6">Contact No.: +63 928 500 0298</h3>
            <h2 className="text-3xl font-bold text-center mb-10" style={{marginBottom: "50px", marginTop: "50px"}} >CERTIFICATION</h2>

            <p className="mt-14 mb-14" style={{marginBottom: "50px", marginTop: "50px"}}>Date: {formData.date ? format(parseISO(formData.date), 'MMMM d, yyyy') : '____/____/____'}</p>
          <p>This is to certify that <strong style={{ paddingLeft: "20px", paddingRight: "20px", textDecoration: "underline" }}>
            {formData.name || '_____________________________'},{formData.age|| '___'}</strong>years old,
          <br/> has been seen and examined in my clinic for Medical Check-up.</p>
            

            <p className="italic my-10 font-medium" style={{marginBottom: "50px",marginTop: "50px"}}>Impression: {formData.diagnosis || '______________________________'}</p>
            
            <p>This certification was issued for whatever purpose it may serve him/her.</p>
            <p className='my-10' style={{ marginBottom: "50px", marginTop: "50px" }}>Thank you very much.</p>


            <p><strong>{formData.doctor || '__________'}</strong></p>
            <p>Lic. No. {formData.licence}</p>
          
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download into PDF
      </button>
    </div>
  );
}
