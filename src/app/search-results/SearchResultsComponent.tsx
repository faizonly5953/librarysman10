"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../componentmain/FirebaseConfig";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookBorrow from "../catalog/componentcatalog/BookBorrow";
import { Book } from "../componentmain/book";
import { BookOpen, Clock } from "lucide-react";
import Navbar from "../componentindex/Navbar";
import Footer from "../componentindex/End";

const SearchResultsComponent = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const allBooks = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            author: data.author,
            rating: data.rating,
            cover: data.cover,
            isAudiobook: data.isAudiobook,
            totalCopies: data.totalCopies,
            availableCopies: data.availableCopies,
            dueDate: data.dueDate,
            location: data.location,
            genre: data.genre,
            currentlyBorrowed: data.currentlyBorrowed,
            createdAt: data.createdAt,
          } as Book;
        });

        setBooks(allBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const search = searchTerm?.toLowerCase() || "";
    const results = books.filter(
      (book) =>
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        book.genre?.toLowerCase().includes(search)
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Search Results Header */}
      <div className="bg-bgphotodark md:pt-[18vh] pt-[12vh] pb-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white">
            {filteredBooks.length > 0
              ? `Found ${filteredBooks.length} results for "${searchTerm}"`
              : `No results found for "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-5xl mx-auto px-5 py-10">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="py-10">
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Book Cover - Improved aspect ratio and responsive sizing */}
      <div className="w-full md:w-32 h-40 md:h-auto md:min-h-full flex-shrink-0 bg-gray-50">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          <div className="flex-grow">
            <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium mt-1">
              {book.author}
            </p>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
              book.availableCopies > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.availableCopies > 0
              ? `${book.availableCopies} Available`
              : "All Borrowed"}
          </span>
        </div>

        {/* Details Section with better spacing */}
        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-gray-500" />
              <span>Total: {book.totalCopies}</span>
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-500" />
              <span>Borrowed: {book.currentlyBorrowed}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-200 flex-shrink-0"></span>
            Location: {book.location}
          </p>
        </div>

        {/* Button Section - Auto margin top to push to bottom of card */}
        <div className="mt-auto">
          {book.availableCopies > 0 ? (
            <BookBorrow book={book} />
          ) : (
            <button
              className="w-full px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed border border-gray-200 opacity-80 flex items-center justify-center gap-2"
              disabled
            >
              <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SearchResultsComponent;
