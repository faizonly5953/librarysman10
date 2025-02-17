import Link from "next/link";

export default function Pinjam() {
    return (
        <div className="h-[30vh] mb-10 bg-gray-50 flex flex-col items-center justify-center">
            <div className="mb-6 font-serif text-4xl">
                <h1>
                Tunggu Apa Lagi Woy
                </h1>
            <small>setelah mengetahui ini semua, pinjam sekarang juga broski</small>
            </div>
        <Link href="/catalog">
            <button className="bg-bgbtn text-white px-6 py-3 rounded-lg hover:bg-bgbtn2 hover:scale-110 transition-transform duration-300">
                Pinjam Sekarang
            </button>
        </Link>
        </div>
    )
}