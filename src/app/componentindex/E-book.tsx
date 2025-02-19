import { motion } from "framer-motion";
import { LibraryBig, Rabbit } from 'lucide-react';

export default function Ebook() {

  const items = [
    {
      icon: <LibraryBig className="text-indigo-600" />,
      bgIcon: "bg-indigo-200",
      bgHover: "bg-indigo-500",
      textHover: "group-hover:text-white",
      title: "Koleksi Lengkap",
    },
    {
      icon: <Rabbit className="text-orange-500" />,
      bgIcon: "bg-orange-200",
      bgHover: "bg-orange-500",
      textHover: "group-hover:text-white",
      title: "Akses Cepat",
    },
  ];

  return (
    <div id="ebook-section" className="w-full md:py-16 py-2 px-4 md:px-10">
      <div 
        className={`min-h-[60vh] bg-bgnew flex flex-col md:flex-row gap-8 md:gap-16 p-6 md:p-14 rounded-3xl shadow-xl transition-all duration-1000 "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="md:w-1/2 flex items-center justify-center relative order-2 md:order-1">
          <img
            src="https://img.freepik.com/free-vector/textbooks-book-day_24911-115208.jpg?t=st=1739806704~exp=1739810304~hmac=b70a065af663fe159eb01023c11085f95c4c568ad387a93b07e7f967994f7d53&w=740"
            alt="Perpustakaan Digital"
            className="relative border-4 md:border-8 border-white rounded-2xl h-auto w-full max-h-[58vh] object-cover shadow-lg transform transition-all duration-300 md:hover:translate-x-3 md:hover:shadow-right hover:scale-105"
          />
        </div>
        
        <div className="flex flex-col justify-center md:w-1/2 order-1 md:order-2">
          <h1 className="text-3xl md:text-4xl mb-3 md:mb-5 font-bold text-white relative md:m-0 m-1 mb-8">
            Meminjam Buku
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-500 transform origin-left transition-all duration-300 group-hover:w-full"></span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Meminjam buku semakin mudah dengan hadirnya perpustakaan digital. Di website perpustakaan digital, kamu bisa meminjam buku secara online, mencari koleksi yang kamu inginkan, dan membacanya kapan saja, di mana saja, tanpa harus datang ke perpustakaan fisik. Dengan cara ini, akses ke ilmu dan bacaan menjadi lebih cepat, praktis, dan tanpa batas, memudahkan siapa saja untuk menikmati berbagai informasi dan hiburan dengan lebih fleksibel.
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
      </div>
    </div>
  );
}