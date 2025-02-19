import Link from "next/link";
import { useState, useEffect } from "react";

export default function Ajakan() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-100 py-20 px-4 md:px-10">
      <div
        className={`max-w-4xl mx-auto transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-center gap-8">
          <div className="pb-5">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative group transition-all hover:tracking-widest hover:text-sky-400">
              Tunggu Apa Lagi?
              <span className="absolute -bottom-5 left-0 w-full h-1 bg-blue-500 transform scale-x-50 mx-auto transition-transform duration-300 group-hover:scale-x-100"></span>
            </h1>
          </div>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed md:w-full w-[38vh]">
            Ribuan buku menarik sudah menanti untuk
            dijelajahi! Jangan biarkan kesempatan berlalu begitu saja—dapatkan
            akses instan ke koleksi terbaik dan mulai petualangan membaca tanpa
            batas. Segera pinjam, baca, dan temukan dunia baru dalam setiap
            halamannya! 
          </p>
          <div className="mt-4 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-500"></div>

            <Link href="/catalog" className="relative block group">
              <button className="relative overflow-hidden bg-white text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-blue-300/50 hover:scale-105 hover:scale-x-110 transform transition-all duration-300 ease-in-out">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 animate-gradient-x transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center justify-center">
                  Menuju Perpustakaan
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </Link>

            <style jsx global>{`
              @keyframes gradient-x {
                0%,
                100% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
              }

              .animate-gradient-x {
                background-size: 200% 200%;
                animation: gradient-x 3s ease infinite;
              }

              .group:hover .animate-gradient-x {
                animation: gradient-x 2s ease infinite;
              }
            `}</style>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center opacity-75">
            <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              Berbagai Buku
            </span>
            <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              Akses Online
            </span>
            <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
              Peminjaman Mudah
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
