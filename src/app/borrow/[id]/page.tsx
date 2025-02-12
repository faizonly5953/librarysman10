"use client"; // Wajib untuk membaca URL

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Buffer } from "buffer";

const BorrowPage = () => {
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    // Ambil hash dari URL (tanpa simbol `#`)
    const hash = window.location.hash.substring(1);

    if (hash) {
      try {
        // Decode Base64 ke JSON
        const decodedData = JSON.parse(Buffer.from(hash, "base64").toString("utf-8"));
        setQrData(decodedData);
      } catch (error) {
        console.error("Gagal membaca QR Data:", error);
      }
    }
  }, []);

  if (!qrData) return <p className="text-center text-red-500">QR Code tidak ditemukan</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="text-white text-2xl font-bold mb-4">Scan QR Code</h1>
        <div className="bg-white p-3 rounded-lg">
          <QRCode value={JSON.stringify(qrData)} size={200} bgColor="#ffffff" fgColor="#000000" />
        </div>
        <p className="text-sm mt-2 text-gray-400">Silahkan Scan QR Diatas</p>
      </div>
    </div>
  );
};

export default BorrowPage;
