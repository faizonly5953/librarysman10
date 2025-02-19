import TranslatableHeader from "./TranslatableHeader";

export default function Intro() {
    return (
      <div id="awal" className="min-h-screen md:pt-28 pt-10 pb-12 bg-slate-50 flex flex-col items-center justify-center">
        {/* Pembuka */}
        <TranslatableHeader value="Begin The Journey" translate="Perjalanan Dimulai" className="z-40 text-black mb-16 text-3xl md:text-5xl hover:tracking-widest uppercase underline underline-offset-[20px]"/>


        {/* Bagian Atas */}
        <div className="group md:w-full w-6xl max-w-5xl h-auto md:h-96 flex flex-col md:flex-row items-center md:mb-12 mb-8 bg-bgnew hover:bg-bgphotoblue rounded-3xl mx-4 md:mx-0 hover:-translate-y-3 transition-all duration-600 hover:shadow-2xl">
          {/* Foto Pengurus */}
          <div className="w-full md:w-1/2 p-6 flex justify-center">
            <img
              src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg"
              alt="Foto Pengurus"
              className="rounded-full border-4 border-bgolive group-hover:border-gray-50 group-hover:border-8 shadow-lg w-48 h-48 md:w-72 md:h-72 object-cover mx-auto transition-colors duration-300"
            />
          </div>

          {/* Deskripsi Pengurus */}
          <div className="w-full md:w-1/2 p-6 md:mr-10 rounded-3xl bg-bgphotodark">
            <h2 className="text-2xl md:text-3xl md:text-start text-center font-bold text-white mb-4">
              Nama Pengurus
            </h2>
            <p className="text-white md:text-start text-center text-lg">
              Ini adalah deskripsi tentang pengurus perpustakaan. Pengurus ini bertugas memastikan
              semua kegiatan di perpustakaan berjalan lancar, mulai dari manajemen buku hingga
              layanan pengunjung. Dengan pengalaman bertahun-tahun, pengurus ini telah membantu
              meningkatkan efisiensi dan kualitas layanan perpustakaan.
            </p>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="group md:w-full w-6xl text-white md:text-start text-center max-w-5xl flex flex-col-reverse md:flex-row items-center justify-center mb-6 bg-bgnew hover:bg-bgphotoblue hover:-translate-y-3 transition-all duration-600 hover:shadow-2xl rounded-3xl mx-4 md:mx-0">
          {/* Tulisan */}
          <div className="w-full md:w-1/2 md:ml-7 p-6 md:mr-10 rounded-3xl bg-bgphotodark">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tentang Perpustakaan
            </h2>
            <p className="text-lg">
              Perpustakaan ini didirikan untuk menyediakan akses mudah ke sumber daya pendidikan
              bagi semua orang. Dengan koleksi buku yang terus berkembang, kami bertujuan untuk
              mendukung pembelajaran, penelitian, dan pengembangan ilmu pengetahuan.
            </p>
          </div>
  
          {/* Gambar */}
          <div className="w-full md:w-1/2 p-6 flex justify-center">
            <img
              src="https://www.reshot.com/preview-assets/icons/RDY93PB7CA/library-RDY93PB7CA.svg"
              alt="Foto Perpustakaan"
              className="rounded-full border-4 border-bgolive group-hover:border-gray-50 group-hover:border-8 shadow-lg w-48 h-48 md:w-72 md:h-72 object-cover mx-auto"
            />
          </div>
        </div>
      </div>
    );
  }
  