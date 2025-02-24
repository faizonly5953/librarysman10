import { Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bgphotodark pt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 ml-6 text-white">
          {/* Tentang Kami */}
          <div>
            <h2 className="relative text-lg font-semibold mb-4 w-fit">
              Tentang kami
              <span className="absolute bottom-[-6px] left-0 h-[4px] bg-sky-900 rounded-[2px] w-1/2"></span>
            </h2>
            <p className="text-sm">
              SMAN 10 Kota Bekasi adalah salah satu Sekolah Menengah Atas Negeri
              di Kota Bekasi, Jawa Barat. Sekolah ini dikenal dengan lingkungan
              belajar yang kondusif, fasilitas yang memadai, serta berbagai
              kegiatan ekstrakurikuler untuk mendukung pengembangan bakat dan
              minat siswa. SMAN 10 juga memiliki komitmen untuk mencetak siswa
              yang berprestasi, baik di bidang akademik maupun non-akademik.
            </p>
          </div>
          {/* Links Cepat */}
          <div>
            <h2 className="relative text-lg font-semibold mb-4 w-fit">
              Tautan Cepat
              <span className="absolute bottom-[-6px] left-0 h-[4px] bg-sky-900 rounded-[2px] w-1/2"></span>
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline underline-offset-2">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-2">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-2">
                  Kontak Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-2">
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="relative text-lg font-semibold mb-4 w-fit">
              Media Sosial
              <span className="absolute bottom-[-6px] left-0 h-[4px] bg-sky-900 rounded-[2px] w-1/2"></span>
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/sman10kotabekasi/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 rounded-3xl p-2 hover:bg-white hover:text-pink-400 hover:border-white transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/sman10kotabekasi/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 rounded-3xl p-2 hover:bg-white hover:text-blue-600 hover:border-white transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-5 pt-5 bg-bgfooter text-center text-white text-base">
        © {new Date().getFullYear()}{" "}
        <a
          href="/credit"
          target="_blank"
          className="font-bold text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-400 bg-clip-text hover:animate-gradient hover:underline transition-allfont-bold text-transparent bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 bg-clip-text hover:animate-gradient hover:underline hover:tracking-[0.7vh] transition-all"
        >
          OPTION
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
