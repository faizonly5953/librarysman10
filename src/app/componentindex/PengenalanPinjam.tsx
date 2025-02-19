import { motion } from "framer-motion";
import { Globe, BookOpenText } from "lucide-react";

export default function Pinjam() {
  const items = [
    {
      icon: <Globe className="text-sky-600" />,
      bgIcon: "bg-blue-100",
      bgHover: "bg-sky-500",
      textHover: "group-hover:text-white",
      title: "Akses Online",
    },
    {
      icon: <BookOpenText className="text-green-600" />,
      bgIcon: "bg-green-100",
      bgHover: "bg-green-500",
      textHover: "group-hover:text-white",
      title: "E-Learning",
    },
  ];

  return (
    <div id="pinjam-section" className="w-full md:py-16 py-8 px-4 md:px-10">
      <div
        className={`min-h-[70vh] pt-5 pb-5 flex flex-col md:flex-row gap-8 md:gap-2 px-6 md:px-14 bg-bgnew rounded-3xl shadow-xl transition-all duration-1000 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="flex flex-col justify-center md:mb-0 md:w-1/2">
          <h1 className="text-3xl md:text-4xl mb-3 md:mb-5 md:m-0 m-1 mb-8 font-bold text-gray-800 relative inline-block text-white">
            Era Digital Sekarang
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-500"></span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Sekarang, meminjam buku semakin mudah dengan hadirnya perpustakaan
            digital. Tanpa perlu datang langsung, siapa saja bisa mencari,
            meminjam, dan membaca buku secara online kapan pun dan di mana pun.
            Dengan akses yang lebih luas dan praktis, membaca menjadi lebih
            fleksibel, efisien, dan sesuai dengan kebutuhan era digital.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden flex items-center bg-white/80 p-3 rounded-lg shadow-sm group"
                whileHover="hover"
                whileTap="hover" // Efek hover aktif saat disentuh
                onTouchStart={() => {}} // Mencegah tap diabaikan di mobile
              >
                {/* Efek Hover Background */}
                <motion.div
                  className={`absolute inset-0 ${item.bgHover}`}
                  initial={{ width: "0%" }}
                  variants={{ hover: { width: "100%" } }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Isi Konten */}
                <div className="relative flex items-center z-10">
                  <div className={`rounded-full p-2 mr-3 ${item.bgIcon}`}>
                    {item.icon}
                  </div>
                  <span
                    className={`text-sm font-medium text-gray-900 ${item.textHover}`}
                  >
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 flex items-center md:justify-end justify-center relative">
          <img
            src="https://www.reshot.com/preview-assets/icons/5M9ABGR4Y6/books-library-5M9ABGR4Y6.svg"
            alt="Perpustakaan Digital"
            className="relative border-4 md:border-8 border-white bg-white rounded-2xl md:max-h-[58vh] object-contain p-4 shadow-lg transform transition-all duration-300 md:hover:-translate-x-3 md:hover:shadow-deep hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
