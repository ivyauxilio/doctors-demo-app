'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  total: number;
  perPage?: number;
  onPageChange?: (newPage: number) => void;
}

export default function Pagination({ page, total, perPage = 10, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);

    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  if (totalPages <= 1) return null;

  // Logic to generate page buttons (max 5 displayed)
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;

    const start = Math.max(2, page - delta);
    const end = Math.min(totalPages - 1, page + delta);

    if (start > 2) pages.push(1, '...');
    else pages.push(1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...', totalPages);
    else if (end === totalPages - 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center mt-6 flex-wrap gap-1">
      {/* Prev */}
      {page > 1 && (
        <button
          onClick={() => changePage(page - 1)}
          className="px-3 py-1 rounded-md border bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">...</span>
        ) : (
          <button
            key={p}
            onClick={() => changePage(Number(p))}
            className={`px-3 py-1 rounded-md border transition-colors duration-200 ${
              page === p
                ? 'bg-brand-500 text-white border-green-700'
                : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      {page < totalPages && (
        <button
          onClick={() => changePage(page + 1)}
          className="px-3 py-1 rounded-md border bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Next
        </button>
      )}
    </div>
  );
}
