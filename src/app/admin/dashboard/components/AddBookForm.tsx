import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/app/componentmain/FirebaseConfig';
import Swal from 'sweetalert2';

const AddBookForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    rating: number;
    cover: string | null; // Ubah agar bisa string atau null
    genre: string;
    totalCopies: number;
    currentlyBorrowed: number;
    location: string;
  }>({
    title: '',
    author: '',
    rating: 0,
    cover: null, // Konsisten dengan null saat awal
    genre: '',
    totalCopies: 1,
    currentlyBorrowed: 0,
    location: ''
  });
  
  
  const [coverType, setCoverType] = useState<'url' | 'upload'>('url');
  const MAX_FILE_SIZE = 1048487; // ~1MB in bytes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'totalCopies' || name === 'currentlyBorrowed'
        ? Number(value)
        : name === 'cover' && value === ''
        ? null  // Biarkan cover tetap null jika kosong
        : value
    }));
  };  

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    if (file.size > MAX_FILE_SIZE) {
      e.target.value = ''; // Reset file input
      await Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: `File size must be less than ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB.`,
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, cover: reader.result as string })); // Pastikan tetap string
    };
    reader.readAsDataURL(file);
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'books'), {
        ...formData,
        availableCopies: formData.totalCopies - formData.currentlyBorrowed,
        createdAt: new Date()
      });
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Book has been added successfully!',
        confirmButtonColor: '#3085d6',
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        author: '',
        rating: 0,
        cover: '',
        genre: '',
        totalCopies: 1,
        currentlyBorrowed: 0,
        location: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
      
      // Show error message
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal menambahkan buku. Silakan coba lagi.',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add New Book
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Book</h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input type="text" name="author" required value={formData.author} onChange={handleChange} className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cover</label>
              <select value={coverType} onChange={(e) => setCoverType(e.target.value as 'url' | 'upload')} className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="url">Use URL</option>
                <option value="upload">Upload Image</option>
              </select>
            </div>

            {coverType === 'url' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover URL</label>
                <input 
                  type="url" 
                  name="cover" 
                  required 
                  value={formData.cover ?? ''} // Pastikan tidak null 
                  onChange={handleChange} 
                  className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Cover (Max {(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB)
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <select name="genre" required value={formData.genre} onChange={handleChange} className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Pilih Genre</option>
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="horror">Horror</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="romance">Romance</option>
                <option value="mystery">Mystery</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                required
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Total Copies</label>
              <input
                type="number"
                name="totalCopies"
                min="1"
                required
                value={formData.totalCopies}
                onChange={handleChange}
                className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Currently Borrowed</label>
              <input
                type="number"
                name="currentlyBorrowed"
                min="0"
                max={formData.totalCopies}
                required
                value={formData.currentlyBorrowed}
                onChange={handleChange}
                className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select name="location" required value={formData.location} onChange={handleChange} className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Pilih Lokasi</option>
                <option value="Shelf 1">Shelf 1</option>
                <option value="Shelf 2">Shelf 2</option>
                <option value="Shelf 3">Shelf 3</option>
                <option value="Shelf 4">Shelf 4</option>
                <option value="Shelf 5">Shelf 5</option>
                <option value="Shelf 6">Shelf 6</option>
                <option value="Shelf 7">Shelf 7</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;