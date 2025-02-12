import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/componentmain/FirebaseConfig';
import FloatingButton from './FloatingButton';
import { Book } from '@/app/componentmain/book';

interface BorrowedBook {
  id: string;
  book: string;
  borrower: string;
  class: string;
  scannedAt: any;
}

export const HomeContent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [lastSync, setLastSync] = useState('');

  useEffect(() => {
    // Update last sync time whenever data changes
    const updateLastSync = () => {
      setLastSync(new Date().toLocaleString());
    };

    try {
      // Real-time listener for books collection
      const unsubscribeBooks = onSnapshot(collection(db, 'books'), (snapshot) => {
        const booksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Book[];
        setBooks(booksData);
        updateLastSync();
        setDbStatus('✓ Active');
      }, (error) => {
        console.error('Error in books listener:', error);
        setDbStatus('✗ Disconnected');
      });

      // Real-time listener for borrow collection
      const unsubscribeBorrow = onSnapshot(collection(db, 'borrow'), (snapshot) => {
        const borrowData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BorrowedBook[];
        setBorrowedBooks(borrowData);
        updateLastSync();
        setDbStatus('✓ Active');
      }, (error) => {
        console.error('Error in borrow listener:', error);
        setDbStatus('✗ Disconnected');
      });

      // Cleanup function to unsubscribe from listeners
      return () => {
        unsubscribeBooks();
        unsubscribeBorrow();
      };
    } catch (error) {
      console.error('Error setting up listeners:', error);
      setDbStatus('✗ Disconnected');
    }
  }, []); // Empty dependency array as we want to set up listeners only once

  const getTotalTitles = () => books.length;
  
  const getTotalCopies = () => {
    return books.reduce((total, book) => {
      const copies = Number(book.totalCopies);
      return total + (isNaN(copies) ? 0 : copies);
    }, 0);
  };

  const getAvailableBooks = () => books.filter(book => book.availableCopies > 0).length;
  
  const getCurrentlyBorrowed = () => {
    return books.reduce((total, book) => {
      const totalCopies = Number(book.totalCopies) || 0;
      const availableCopies = Number(book.availableCopies) || 0;
      return total + (totalCopies - availableCopies);
    }, 0);
  };

  const getBorrowedPercentage = () => {
    const totalCopies = getTotalCopies();
    const currentlyBorrowed = getCurrentlyBorrowed();
    return totalCopies > 0 ? ((currentlyBorrowed / totalCopies) * 100).toFixed(1) : '0';
  };

  const getRecentlyAddedBooks = () => books.slice(0, 3);
  const getRecentBorrowedBooks = () => borrowedBooks.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Selamat Datang Di Kontrol Perpustakaan</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Dapatkan ikhtisar cepat tentang status terkini dan aktivitas terkini perpustakaan Anda.
        </p>
        
        <FloatingButton />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Library Statistics */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Statistik Buku Perpustakaan</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-blue-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Jumlah Judul Buku</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{getTotalTitles()}</p>
              </div>
              <div className="bg-purple-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Jumlah Salinan Buku</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{getTotalCopies()}</p>
              </div>
            </div>
          </div>

          {/* Borrowed Books Statistics */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Statistik Buku yang Dipinjam</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-yellow-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Buku Yang Dipinjam</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{getCurrentlyBorrowed()}</p>
              </div>
              <div className="bg-red-50 p-2 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Persentase Pinjaman</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  {getBorrowedPercentage()}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Aktivitas Terbaru</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Buku yang Baru Ditambahkan</p>
                {getRecentlyAddedBooks().map(book => (
                  <div key={book.id} className="text-xs sm:text-sm text-gray-600">
                    {book.title} by {book.author}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700 mt-4 mb-2">Buku yang Baru Dipinjam</p>
                {getRecentBorrowedBooks().map(book => (
                  <div key={book.id} className="text-xs sm:text-sm text-gray-600">
                    {book.book} - Dipinjam Oleh {book.borrower}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">System Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Database Connection</span>
                <span className={`font-bold ${dbStatus === '✓ Active' ? 'text-green-500' : 'text-red-500'}`}>{dbStatus}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Last Sync</span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {lastSync}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;