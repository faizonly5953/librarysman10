import { useRef, useState, useEffect } from "react";
import { Scan } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Swal from "sweetalert2";
import { db } from "@/app/componentmain/FirebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";

const FloatingButton = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopQRScanner();
    };
  }, []);

  const onScanSuccess = async (decodedText: string) => {
    console.log(`Code matched = ${decodedText}`);
    stopQRScanner();

    let parsedData;
    try {
      parsedData = JSON.parse(decodedText);
    } catch (error) {
      console.error("Parsing JSON gagal:", error);
      Swal.fire({
        title: "Error",
        text: "QR Code bukan format JSON yang valid!",
        icon: "error",
      });
      return;
    }

    try {
      const borrowRef = collection(db, "borrow");
      const q = query(borrowRef, where("book", "==", parsedData.book), where("borrower", "==", parsedData.borrower));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        Swal.fire({
          title: "Gagal!",
          text: "Data sudah ada atau telah dipindai sebelumnya.",
          icon: "warning",
        });
        return;
      }

      await addDoc(borrowRef, {
        ...parsedData,
        isReturned: false, 
        ActionReturned: true, 
        scannedAt: serverTimestamp(),
      });
      console.log("Data berhasil disimpan ke Firestore");
      Swal.fire({
        title: "Scan Berhasil!",
        text: "Data berhasil dikirim ke database.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal menyimpan ke Firestore:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
        icon: "error",
      });
    }
  };

  const onScanError = (errorMessage: string) => {
    if (
      errorMessage.includes("No barcode or QR code detected") ||
      errorMessage.includes("NotFoundException")
    ) {
      return;
    }

    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

    errorTimeoutRef.current = setTimeout(() => {
      setError(errorMessage);
    }, 2000);
  };

  const startQRScanner = () => {
    try {
      setIsScanning(true);
      setError(null);

      setTimeout(() => {
        const qrElement = document.getElementById("qr-reader");
        if (!qrElement) {
          setError("QR Reader not found!");
          setIsScanning(false);
          return;
        }

        if (scannerRef.current) {
          scannerRef.current.clear().catch(() => {});
        }

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: false,
          aspectRatio: 1.0,
        };

        scannerRef.current = new Html5QrcodeScanner("qr-reader", config, false);
        scannerRef.current.render(onScanSuccess, onScanError);
      }, 500);
    } catch (error) {
      setError("Console Error");
      setIsScanning(false);
    }
  };

  const stopQRScanner = () => {
    try {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      setIsScanning(false);
    } catch (error) {
      setError("Console Error");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={isScanning ? stopQRScanner : startQRScanner}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all"
        title={isScanning ? "Stop scanning" : "Scan QR Code"}
      >
        <Scan size={24} />
      </button>

      {error && (
        <div className="fixed bottom-20 right-4 w-64 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {isScanning && (
        <div className="fixed bottom-20 text-black right-4 w-64 h-64 bg-white rounded-lg overflow-hidden">
          <div id="qr-reader" className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
