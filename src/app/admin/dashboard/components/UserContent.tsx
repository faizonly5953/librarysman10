import { useEffect, useState } from "react";
import { db } from "@/app/componentmain/FirebaseConfig";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp, 
  increment 
} from "firebase/firestore";
import Swal from "sweetalert2";

const BorrowedBooks = () => {
  interface Book {
    id: string;
    book: string;
    borrower: string;
    class: string;
    phone: string;
    location: string;
    isReturned: boolean;
    ActionReturned: boolean;
    date: string;
    scannedAt: Timestamp;
  }

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "borrow"));
      const booksData = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          book: data.book,
          borrower: data.borrower,
          class: data.class,
          phone: data.phone,
          location: data.location,
          scannedAt: data.scannedAt,
          date: data.date,
          isReturned: data.isReturned ?? false,
          ActionReturned: data.ActionReturned ?? false,
        } as Book;
      });
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const handleReturnBook = async (book: Book) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Pengembalian',
      text: `Apakah Anda yakin buku "${book.book}" sudah dikembalikan oleh ${book.borrower} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, sudah!',
      cancelButtonText: 'Batal',
    });
  
    if (result.isConfirmed) {
      try {
        const booksQuery = await getDocs(collection(db, "books"));
        let bookDocId = null;
    
        booksQuery.forEach((doc) => {
          if (doc.data().title === book.book) {
            bookDocId = doc.id;
          }
        });
    
        if (bookDocId) {
          const bookDocRef = doc(db, "books", bookDocId);
          await updateDoc(bookDocRef, {
            currentlyBorrowed: increment(-1),
            availableCopies: increment(1),
          });
          console.log("Buku diperbarui di Firestore.");
        } else {
          console.error("Book document ID not found.");
          return;
        }
    
        const borrowRef = doc(db, "borrow", book.id);
        await updateDoc(borrowRef, {
          isReturned: true,
          ActionReturned: false,
        });
    
        await deleteDoc(borrowRef);
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
        Swal.fire('Berhasil!', 'Buku telah dikonfirmasi dikembalikan.', 'success');
      } catch (error) {
        console.error("Error saat mengembalikan buku:", error);
        Swal.fire('Gagal!', 'Terjadi kesalahan. Silakan coba lagi.', 'error');
      }
    }
  };
  const calculateStatus = (book: Book) => {
    const today = new Date();
    const dueDate = new Date(book.date);
    
    // Reset time part to compare just the dates
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    if (book.isReturned) {
      return { text: '✅ Dikembalikan', class: 'text-green-500', daysRemaining: null };
    }
    
    // Calculate days remaining or overdue
    const diffDays = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return {
        text: `Buku dikembalikan ${diffDays} hari lagi`,
        class: 'text-blue-500 font-medium',
        daysRemaining: diffDays
      };
    } else if (diffDays === 0) {
      return {
        text: 'Buku Dikembalikan Hari Ini',
        class: 'text-green-500 font-medium',
        daysRemaining: 0
      };
    } else {
      const overdueDays = Math.abs(diffDays);
      return {
        text: `Tunggakan Selama ${overdueDays} hari (Denda: ${(overdueDays * 5000).toLocaleString('id-ID')} rupiah)`,
        class: 'text-red-500 font-medium',
        daysRemaining: diffDays
      };
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
        Daftar Peminjaman Buku
      </h2>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-[156vh]">
        <div className="max-h-[650px] overflow-x-auto rounded-lg">
          <div className="overflow-x-auto sm:overflow-visible">
            <table className="w-full border-collapse table-auto min-w-[1200px] hidden sm:table">
              <thead className="sticky top-0 bg-gray-400 text-black text-xs sm:text-sm uppercase shadow-md">
                <tr className="text-center">
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Judul Buku</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Nama Peminjam</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Kelas</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Nomor Telepon</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Lokasi Buku</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Tanggal Peminjaman</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Tanggal Pengembalian</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Status</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs sm:text-sm">
                {books.map((book, index) => {
                  const status = calculateStatus(book);

                  return (
                    <tr
                      key={book.id}
                      className={`border-b border-gray-200 text-center ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-200 transition-all duration-200`}
                    >
                      <td className="px-2 sm:px-6 py-2 sm:py-3">{book.book}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">{book.borrower}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">{book.class}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">
                        <div className="flex flex-col items-center">
                          {book.phone}
                          <br />
                          {book.phone ? (
                            <a
                              href={`https://wa.me/${book.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline text-xs sm:text-sm"
                            >
                              Chat via WhatsApp
                            </a>
                          ) : "N/A"}
                        </div>
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">{book.location}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">
                        {book.scannedAt
                          ? book.scannedAt.toDate().toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">
                        {book.date
                          ? new Date(book.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className={`px-2 sm:px-6 py-2 sm:py-3 ${status.class}`}>
                        {status.text}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-3">
                        {book.ActionReturned && (
                          <button
                            onClick={() => handleReturnBook(book)}
                            className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition text-xs sm:text-sm"
                          >
                            Sudah Dikembalikan
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            <div className="sm:hidden space-y-4">
              {books.map((book) => {
                const status = calculateStatus(book);

                return (
                  <div key={book.id} className="p-4 bg-white shadow rounded-lg space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Judul Buku</p>
                    <p className="text-gray-800">{book.book}</p>

                    <p className="text-sm font-semibold text-gray-600">Nama Peminjam</p>
                    <p className="text-gray-800">{book.borrower}</p>

                    <p className="text-sm font-semibold text-gray-600">Kelas</p>
                    <p className="text-gray-800">{book.class}</p>

                    <p className="text-sm font-semibold text-gray-600">Nomor Telepon</p>
                    <p className="text-gray-800">{book.phone}</p>

                    <p className="text-sm font-semibold text-gray-600">Lokasi Buku</p>
                    <p className="text-gray-800">{book.location}</p>

                    <p className="text-sm font-semibold text-gray-600">Tanggal Peminjaman</p>
                    <p className="text-gray-800">
                      {book.scannedAt?.toDate().toLocaleDateString("id-ID") || "N/A"}
                    </p>

                    <p className="text-sm font-semibold text-gray-600">Tanggal Pengembalian</p>
                    <p className="text-gray-800">
                      {book.date ? new Date(book.date).toLocaleDateString("id-ID") : "N/A"}
                    </p>

                    <p className="text-sm font-semibold text-gray-600">Status</p>
                    <p className={`text-gray-800 ${status.class}`}>
                      {status.text}
                    </p>

                    {book.ActionReturned && (
                      <button
                        onClick={() => handleReturnBook(book)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition text-sm"
                      >
                        Sudah Dikembalikan
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooks;