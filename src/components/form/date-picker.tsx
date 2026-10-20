"use client";

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CalenderIcon } from '../../icons';

// Utility function for YYYY-MM-DD formatting
function formatDateToYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

type DatePickerProps = {
  id: string;
  placeholder?: string;
  value: string | null;
  onChange: (date: string | null) => void;
};

const DatePicker = ({ id, placeholder, value, onChange }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Initialize flatpickr
    flatpickrRef.current = flatpickr(inputRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: value || undefined,
      onChange: (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
          onChange(formatDateToYMD(selectedDates[0]));
        } else {
          onChange(null);
        }
      },
    });

    return () => {
      flatpickrRef.current?.destroy();
      flatpickrRef.current = null;
    };
  }, [id]);

  // Keep flatpickr in sync with parent state
  useEffect(() => {
    flatpickrRef.current?.setDate(value ?? "", false);
  }, [value]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        placeholder={placeholder}
        className="w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500 border-gray-300 dark:border-gray-700 transition-all duration-200"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none dark:text-gray-400">
        <CalenderIcon className="size-6" />
      </span>
    </div>
  );
};

export default DatePicker;
