'use client';

import Navbar from "./componentindex/Navbar";

export default function Custom404() {
  return(
    <>
      <Navbar />
      <div className="flex-grow py-52 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 py-16">
        <div className="max-w-xl">
          <h1 className="text-5xl font-serif mb-6">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 text-lg mb-8">
            "Mohon maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan periksa kembali URL atau kembali ke halaman utama perpustakaan kami untuk melanjutkan pencarian konten yang Anda butuhkan."
          </p>
          <a 
            href="/catalog"
            className="inline-block bg-[#1B1411] text-white px-8 py-3 rounded hover:bg-[#2C2320] transition-colors"
          >
            Journey on!
          </a>
        </div>
      </div>
    </>
  );
}