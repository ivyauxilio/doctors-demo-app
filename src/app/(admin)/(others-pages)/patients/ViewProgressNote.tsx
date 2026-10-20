'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchProgressNotesByPatient,
  deleteProgressNote ,
} from '@/store/slices/progressNoteSlice';
import { fetchPatients } from '@/store/slices/patientSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import Swal from 'sweetalert2';

interface Props {
  patientId: number;
}

export default function ProgressNoteViewer({ patientId }: Props) {
  const dispatch = useAppDispatch();
  const { notes,loading } = useSelector(
    (state: RootState) => state.progressNotes
  );
  // const { notes, loading } = useAppSelector(selectProgressNotes);
  const [openYear, setOpenYear] = useState<number | null>(null);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchProgressNotesByPatient(patientId));
    }
  }, [patientId]);

  useEffect(() => {
    if (notes.length > 0) {
      const firstYear = new Date(notes[0].visit_date).getFullYear();
      setOpenYear(firstYear);
    }
  }, [notes]);

  const handleDelete = (noteId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      topLayer: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProgressNote({ patientId, noteId }))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              topLayer: true,
              text: "Progress note has been deleted.",
              icon: "success"
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              topLayer: true,
              text: "Failed to delete progress note.",
              icon: "error"
            });
          });
      }
    });
  };
  
  const grouped = notes.reduce((acc: Record<number, typeof notes>, note) => {
    const year = note.year || new Date(note.visit_date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(note);
    return acc;
  }, {});

  // if (loading) return <p>Loading progress notes...</p>;

return (
  <>
    {loading ? (
      <LoadingNotesTable />
    ) : notes.length === 0 ? (
      <div className="text-gray-500 italic p-4 border rounded">
        No progress notes available.
      </div>
    ) : (
      <div className="space-y-4">
        {Object.keys(grouped)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => {
            const notesForYear = grouped[Number(year)];
            const isOpen = openYear === Number(year);

            return (
              <div key={year} className="border rounded">
                <button
                  onClick={() => setOpenYear(isOpen ? null : Number(year))}
                  className="w-full text-left p-3 bg-gray-100 font-semibold"
                >
                  {year}
                </button>

                {isOpen && (
                  <div className="p-4">
                    <table className="w-full table-auto border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2">Date</th>
                          <th className="border p-2">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notesForYear.map((note) => (
                          <tr key={note.id}>
                            <td className="border p-2 relative">
                              {new Date(note.visit_date).toLocaleDateString('en-CA', {
                                timeZone: 'Asia/Manila',
                              })}
                            </td>
                            <td className="border p-2">
                               <div className="flex items-start gap-2">
                                <textarea
                                  className="w-full border-b rounded p-1"
                                  rows={3}
                                  value={note.note}
                                  readOnly
                                />
                                <button
                                  onClick={() => handleDelete(note.id)}
                                  className="text-red-600 hover:text-red-800 px-2"
                                >
                                  ✕
                                </button>
                                </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    )}
  </>
  );
}


const LoadingNotesTable = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="border rounded">
          <div className="w-full text-left p-3 bg-gray-100 font-semibold">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>

          <div className="p-4">
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </th>
                  <th className="border p-2">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border p-2">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="border p-2">
                      <div className="h-16 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};