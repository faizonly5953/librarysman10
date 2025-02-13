'use client';

import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/componentmain/FirebaseConfig';
import { Book } from '@/app/componentmain/book';
import { Settings, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface BookActionsProps {
  book: Book;
  onUpdate: () => void;
}

const BookActions: React.FC<BookActionsProps> = ({ book, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: book.title,
    author: book.author,
    cover: book.cover,
    genre: book.genre,
    location: book.location,
    rating: book.rating,
    totalCopies: book.totalCopies,
    currentlyBorrowed: book.currentlyBorrowed,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'totalCopies' || name === 'currentlyBorrowed' ? Number(value) : value,
    }));
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus buku "${book.title}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'books', book.id));
        onUpdate();
        Swal.fire('Terhapus!', 'Buku telah dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting book:', error);
        Swal.fire('Gagal!', 'Gagal menghapus buku. Silakan coba lagi.', 'error');
      }
    }
  };
  

  const handleEdit = async () => {
    if (!editForm.title.trim() || !editForm.author.trim()) {
      alert('Judul dan Penulis tidak boleh kosong!');
      return;
    }

    const updatedBook = {
      ...editForm,
      availableCopies: editForm.totalCopies - editForm.currentlyBorrowed,
    };

    try {
      await updateDoc(doc(db, 'books', book.id), updatedBook);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Gagal mengupdate buku. Silakan coba lagi.');
    }
  };

  const cancelEdit = () => {
    setEditForm({
      title: book.title,
      author: book.author,
      cover: book.cover,
      genre: book.genre,
      location: book.location,
      rating: book.rating,
      totalCopies: book.totalCopies,
      currentlyBorrowed: book.currentlyBorrowed,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className='flex'>
      <div className='mr-4'>
      <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-zinc-950 text-sm border rounded hover:bg-blue-400 bg-blue-300"><Settings size={20} /></button>
      </div>
      <button onClick={handleDelete} className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"><Trash2 size={20}/></button>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Buku</h2>
            <div className="space-y-2">
              {(Object.keys(editForm) as (keyof typeof editForm)[]).map(key => (
                <div key={key} className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={editForm[key]}
                    onChange={handleInputChange}
                    placeholder={key}
                    className="w-full p-2 text-zinc-950 border rounded"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={cancelEdit} className="px-4 py-2 text-zinc-950 text-sm border rounded hover:bg-gray-100">Batal</button>
              <button onClick={handleEdit} className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookActions;
