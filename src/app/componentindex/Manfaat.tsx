import { useState } from 'react';

export default function Manfaat() {
  // For hover effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  interface Benefit {
    id: number;
    title: string;
    description: string;
    icon: string;
  }
  const benefits = [
    {
      id: 1,
      title: "Akses Tanpa Batas",
      description: "Baca buku favorit kapan pun dan di mana pun tanpa hambatan! Dengan perpustakaan digital ini, kalian bisa menikmati koleksi buku hanya dengan sekali klik—tanpa perlu datang langsung.",
      icon: "📚"
    },
    {
      id: 2,
      title: "Hemat Waktu",
      description: "Tidak ada lagi antre panjang! Pilih, pinjam, dan baca buku dalam hitungan detik. Proses cepat dan praktis yang membuat pengalaman membaca lebih menyenangkan.",
      icon: "⏳"
    },
    {
      id: 3,
      title: "Koleksi Lengkap",
      description: "Dari buku akademik hingga novel yang ada di perpustakaan, semuanya ada di sini! Temukan berbagai kategori dan genre yang akan menemani kalian kapan saja dan dimana saja.",
      icon: "📖"
    },
  ];
  

  return (
    <div className="w-full py-16 px-4 md:px-10 bg-gray-50">
      <div className="h-full md:pb-0 pb-10 pt-10 bg-bgphotoblue flex flex-col gap-10 md:gap-1 px-6 md:px-14 rounded-3xl shadow-xl max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl mb-3 md:mb-2 font-bold text-white relative inline-block">
            Apa Manfaatnya?
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto md:pb-10">
            Meminjam buku semakin mudah dengan hadirnya perpustakaan digital.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center md:gap-6 gap-10 md:pb-14 pb-0">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg sm:w-72 sm:h-[70vh] flex flex-col items-center justify-center text-center transform transition-all duration-300 ease-in-out ${
            hoveredCard === benefit.id ? 'scale-105 -translate-y-2 bg-blue-50' : ''
              }`}
              onMouseEnter={() => setHoveredCard(benefit.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-8xl mb-4 text-blue-600">{benefit.icon}</div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">{benefit.title}</h2>
              <p className="text-base text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}