'use client';

import React, { useEffect, useRef } from 'react';
import { Book } from '@/app/componentmain/book';
import BookActions from './BookAction';

interface BookTableProps {
  books: Book[];
  isLoading: boolean;
  onUpdate: () => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, isLoading, onUpdate }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [books]);

  if (isLoading) {
    return <div className="flex justify-center items-center py-8 text-gray-500">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="flex justify-center items-center py-8 text-gray-500">No books found</div>;
  }

  return (
    <div ref={tableContainerRef} className="max-h-[500px] overflow-y-auto">
      
      {/* TABEL untuk layar besar */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrowed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.availableCopies}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.currentlyBorrowed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.rating}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-5">
                    <BookActions book={book} onUpdate={onUpdate} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GRID untuk layar kecil (mobile) */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Genre: {book.genre}</p>
            <p className="text-sm text-gray-600">Location: {book.location}</p>
            <p className="text-sm text-gray-600">Available: {book.availableCopies}</p>
            <p className="text-sm text-gray-600">Borrowed: {book.currentlyBorrowed}</p>
            <p className="text-sm text-gray-600">Rating: {book.rating}</p>
            <div className="mt-2">
              <BookActions book={book} onUpdate={onUpdate} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BookTable;
