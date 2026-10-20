'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addProgressNote, fetchProgressNotesByPatient } from '@/store/slices/progressNoteSlice';
import { fetchPatients } from '@/store/slices/patientSlice';
import Swal from 'sweetalert2';

type Props = {
  patientId: number;
  doctorId: number;
};

const ProgressNoteForm: React.FC<Props> = ({ patientId,doctorId }) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [note, setNote] = useState('');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!note.trim()) return;

    await dispatch(
      addProgressNote({
        patient_id: patientId,
        doctor_id: doctorId,
        note,
        visit_date: visitDate || new Date().toISOString().split("T")[0],
      })
    );

    setNote('');
    setVisitDate('');
    Swal.fire({
      position: "center",
      topLayer: true,
      icon: "success",
      title: "Progress notes has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    dispatch(fetchProgressNotesByPatient(patientId)); // Refresh notes
    dispatch(fetchPatients({ page:1 , search }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    const sentences = value.split(/(?<=[.?!])\s+/);

      const capitalizedSentences = sentences.map(sentence => {
    // Check if the sentence is not empty before attempting to capitalize it.
    if (sentence.length > 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
      }
      return '';
    });
    const formattedText = capitalizedSentences.join(' ');
    setNote(formattedText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-xl bg-gray-50 mb-6">
      <h3 className="text-lg font-semibold">Add</h3>

      <div>
        <label className="block mb-1 text-sm font-medium">Visit Date</label>
        <input
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Progress Note</label>
        <textarea
          rows={4}
          value={note}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Write note here..."
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Note
      </button>
    </form>
  );
};

export default ProgressNoteForm;
