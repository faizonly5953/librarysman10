"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      id="utama"
      className="min-h-screen bg-background md:pt-[64px] pt-[50px] md:ml-10 flex flex-row items-center justify-center gap-6"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-10 md:py-10 py-20 flex flex-col-reverse md:flex-row items-center">
        {/* Teks Pembukaan */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1
            className={
              "md:text-5xl text-3xl font-bold text-gray-800 md:mb-4 mb-0 pb-7"
            }
          >
            Perpustakaan SMAN 10 Kota Bekasi
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {/* Versi Mobile (Lebih Pendek) */}
            <span className="italic sm:hidden">
              "Kalau engkau hanya membaca buku yang dibaca semua orang, engkau
              hanya bisa berpikir sama seperti semua orang." (Haruki Murakami).
            </span>

            {/* Versi Desktop (Lengkap) */}
            <span className="italic hidden sm:inline">
              "Kalau engkau hanya membaca buku yang dibaca semua orang, engkau
              hanya bisa berpikir sama seperti semua orang." (Haruki Murakami).
            </span>
            <span className="hidden sm:inline">
              Welcome to our digital library that provides easy access to
              thousands of books from fiction to non-fiction along with
              educational resources; explore book categories, find your favorite
              reads, and contact us to enjoy a seamless reading experience in
              one platform!
            </span>
          </p>

          <Link href="#awal">
            <button className="bg-bgbtn text-white px-6 py-3 rounded-lg hover:bg-bgphotodark hover:scale-110 transition-transform duration-300">
              Explore
            </button>
          </Link>
        </div>

        {/* Gambar Logo */}
        <div className="md:w-1/2 flex justify-end justify-center mb-6 md:mb-0">
          <Image
            src="/smanten.png"
            alt="Logo SMAN 10 Kota Bekasi"
            width={400}
            height={400}
            priority
          />
        </div>
      </section>
    </div>
  );
}
