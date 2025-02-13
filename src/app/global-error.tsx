'use client';

import Navbar from "./componentindex/Navbar";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error?: Error; reset?: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // Tentukan pesan error berdasarkan tipe error
  const errorMessage = error
    ? "Terjadi kesalahan pada sistem. Silakan coba lagi nanti."
    : "Halaman yang Anda cari tidak dapat ditemukan.";

  return (
    <>
      <Navbar />
      <div className="flex-grow py-52 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 py-16">
        <div className="max-w-xl text-center">
          <h1 className="text-5xl font-serif mb-6">
            {error ? "Oops! Terjadi Kesalahan" : "Halaman Tidak Ditemukan"}
          </h1>
          <p className="text-gray-600 text-lg mb-8">{errorMessage}</p>
          <a 
            href="/catalog"
            className="inline-block bg-[#1B1411] text-white px-8 py-3 rounded hover:bg-[#2C2320] transition-colors"
          >
            Journey on!
          </a>
          {reset && (
            <button 
              onClick={() => reset()} 
              className="ml-4 inline-block bg-gray-700 text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </>
  );
}
