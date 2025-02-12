'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/componentmain/FirebaseConfig';
import { Book } from '@/app/componentmain/book';
import BookTable from './BookTable';
import { toast } from 'react-hot-toast';
import AddBookForm from './AddBookForm';

export const BookContent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const booksQuery = query(collection(db, 'books'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(booksQuery);
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Book[];
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();

    // Listen for changes in the "borrow" collection
    const unsubscribe = onSnapshot(collection(db, 'borrow'), async (snapshot) => {
      const borrowData = snapshot.docs.map(doc => doc.data());

      // Kelompokkan jumlah peminjaman berdasarkan author & book
      const borrowCountMap = new Map();

      borrowData.forEach(({ author, book }) => {
        const key = `${author}-${book}`;
        borrowCountMap.set(key, (borrowCountMap.get(key) || 0) + 1);
      });

      // Ambil semua data dari koleksi "books"
      const booksQuery = query(collection(db, 'books'));
      const querySnapshot = await getDocs(booksQuery);

      for (const [key, borrowCount] of borrowCountMap.entries()) {
        const [author, book] = key.split('-');

        // Cari buku yang cocok di database "books"
        const matchedBookDoc = querySnapshot.docs.find(
          (doc) => doc.data().author === author && doc.data().title === book
        );

        if (matchedBookDoc) {
          const bookRef = doc(db, 'books', matchedBookDoc.id);
          const bookData = matchedBookDoc.data();

          // Pastikan totalCopies ada agar tidak terjadi error
          if (bookData.totalCopies !== undefined) {
            const newAvailableCopies = Math.max(bookData.totalCopies - borrowCount, 0);

            await updateDoc(bookRef, {
              currentlyBorrowed: borrowCount,
              availableCopies: newAvailableCopies
            });

            toast.success(`Buku "${book}" oleh ${author} diperbarui: 
            currentlyBorrowed = ${borrowCount}, availableCopies = ${newAvailableCopies}`);
          } else {
            console.error(`Error: totalCopies tidak ditemukan untuk buku "${book}"`);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // New calculation functions
  const getTotalCopies = () => {
    return books.reduce((total, book) => {
      const copies = Number(book.totalCopies);
      return total + (isNaN(copies) ? 0 : copies);
    }, 0);
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-2 sm:px-0">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Selamat Datang Di Kontrol Perpustakaan</h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
            Di sini Anda dapat melihat ikhtisar katalog dan aktivitas perpustakaan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-black">Statistik Cepat</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-2">
              <div className="bg-blue-50 p-2 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-gray-600">Total Judul</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{books.length}</p>
              </div>
              <div className="bg-purple-50 p-2 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-gray-600">Total Buku</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{getTotalCopies()}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-yellow-50 p-2 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-gray-600">Buku Yang Dipinjam</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{getCurrentlyBorrowed()}</p>
              </div>
              <div className="bg-red-50 p-2 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-gray-600">Persentase Pinjaman</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{getBorrowedPercentage()}%</p>
              </div>
            </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-base sm:text-lg text-gray-700 font-semibold mb-3 sm:mb-4">Aktivitas Terbaru</h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm text-gray-600">Buku terbaru yang ditambahkan :</p>
                <ul className="space-y-1 sm:space-y-2">
                  {books.slice(0, 3).map(book => (
                    <li key={book.id} className="text-xs sm:text-sm text-gray-700">
                      {book.title} by {book.author} saat {book.createdAt ? new Date(book.createdAt.toDate()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-4 sm:p-6">
                <div className='flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6'>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">Katalog Buku</h2> 
                  <AddBookForm />
                </div>
                <BookTable 
                  books={books} 
                  isLoading={isLoading} 
                  onUpdate={fetchBooks} 
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookContent;