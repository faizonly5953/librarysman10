import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Filter } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/app/componentmain/FirebaseConfig';
import SearchBar from './SearchBar';
import { useRouter } from "next/navigation";
import BookBorrow from './BookBorrow';
import { Book } from '@/app/componentmain/book';
import { motion } from 'framer-motion';
import Footer from '@/app/componentindex/End';
import Navbar from '@/app/componentindex/Navbar';

const LibraryCatalog = () => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [bookData, setBookData] = useState<{ [key: string]: Book[] }>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksArray: Book[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        const groupedBooks: { [key: string]: Book[] } = {};
        booksArray.forEach(book => {
          if (!groupedBooks[book.genre]) {
            groupedBooks[book.genre] = [];
          }
          groupedBooks[book.genre].push(book);
        });

        setBookData(groupedBooks);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBooks();
  }, []);

  const allBooks = Object.values(bookData).flat();
  const featuredBooks = allBooks.filter(book => book.rating >= 4);

  const BookCard = ({ book }: { book: Book }) => {
    const router = useRouter();
    
    return (
      <div className='mx-4'>
      <div className="flex flex-col border-2 hover:border-orange-100 md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200">
        {/* Cover Image */}
        <div className="relative w-full md:w-48">
          <div className="pt-[150%] md:pt-[160%]">
            <img
              src={book.cover}
             alt={book.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
           />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="w-full p-3 md:p-4"> 
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div>
              <h3 className="font-semibold text-base text-gray-800">{book.title}</h3>
              <p className="text-gray-600 text-sm">{book.author}</p>
            </div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              book.availableCopies > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {book.availableCopies > 0 ? `${book.availableCopies} Tersedia` : "Dipinjam Semua"}
            </span>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen size={12} />
                <span>Total: {book.totalCopies}</span>
              </div>
              <span className="hidden sm:inline mx-1">•</span>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>Dipinjam: {book.currentlyBorrowed}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Lokasi: {book.location}</p>
          </div>
          
          <div className="mt-2">
        {book.availableCopies > 0 ? (
          <BookBorrow book={book} />
        ) : (
          <div className="text-sm text-gray-500 italic">
            Tidak dapat dipinjam
          </div>
        )}
      </div>
        </div>
      </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <Navbar />
      <div className="w-full">
        {/* Header Section */}
        <div className="bg-orange-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 pt-28 pb-3">
            <h1 className="text-xl md:text-4xl text-center font-serif text-gray-800">Katalog Perpustakaan</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-orange-50 py-4">
          <div className="max-w-5xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <SearchBar />
              <p className="mt-2 text-sm text-gray-600 text-center pb-3">
                Cari buku berdasarkan judul, penulis, atau genre
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - More compact max-width */}
      <div className="max-w-7xl mx-auto py-16">
        {/* Featured Books */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 md:pl-6 pl-6 text-gray-800">Buku Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mdmx-0">
            {featuredBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Genre Filter - More compact */}
        <section className="mt-14 mx-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Koleksi Buku</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
        >
          <Filter size={16} />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveGenre("all")}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeGenre === "all" ? "bg-[#e6c69c] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Semua Buku
          </button>
          {Object.keys(bookData).map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-3 py-1 rounded-full text-sm capitalize whitespace-nowrap ${
                activeGenre === genre ? "bg-[#e6c69c] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </motion.div>
    </section>

        {/* Book List - 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(activeGenre === 'all' ? allBooks : bookData[activeGenre])?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LibraryCatalog;