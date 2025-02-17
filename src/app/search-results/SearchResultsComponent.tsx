"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../componentmain/FirebaseConfig";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookBorrow from "../catalog/componentcatalog/BookBorrow";
import { Book } from "../componentmain/book";
import { BookOpen, Clock } from 'lucide-react';

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
      {/* Search Results Header */}
      <div className="bg-orange-50 py-4">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            {filteredBooks.length > 0
              ? `Found ${filteredBooks.length} results for "${searchTerm}"`
              : `No results found for "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200">
      <div className="w-full md:w-24 h-48 md:h-32">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
      </div>

      <div className="w-full p-3 md:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <h3 className="font-semibold text-base text-gray-800">{book.title}</h3>
            <p className="text-gray-600 text-sm">{book.author}</p>
          </div>
          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
            book.availableCopies > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {book.availableCopies > 0 ? `${book.availableCopies} Available` : "All Borrowed"}
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
              <span>Borrowed: {book.currentlyBorrowed}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Location: {book.location}</p>
        </div>

        <div className="mt-2">
          {book.availableCopies > 0 ? (
            <BookBorrow book={book} />
          ) : (
            <button 
              className="w-full px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed"
              disabled
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsComponent;