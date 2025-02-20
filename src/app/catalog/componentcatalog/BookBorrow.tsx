import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/app/componentmain/book";
import { Buffer } from "buffer";
import Swal from "sweetalert2";

const BookBorrow = ({ book }: { book: Book }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [borrowerInfo, setBorrowerInfo] = useState({
    name: "",
    role: "",
    class: "",
    subclass: "",
    phone: "",
    date: "",
  });

  const router = useRouter();

  const classOptions = {
    "10": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    "11": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    "12": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("0")) {
      return "+62" + phone.slice(1);
    }
    return phone.startsWith("+62") ? phone : `+62${phone}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBorrowerInfo({ ...borrowerInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmBorrow = () => {
    if (
      borrowerInfo.name &&
      borrowerInfo.role &&
      (borrowerInfo.role === "Guru" || (borrowerInfo.class && borrowerInfo.subclass)) &&
      borrowerInfo.phone &&
      borrowerInfo.date
    ) {
      const borrowId = Date.now().toString();
      const formattedPhone = formatPhoneNumber(borrowerInfo.phone);
      const qrContent = JSON.stringify({
        book: book.title,
        author: book.author,
        location: book.location,
        borrower: borrowerInfo.name,
        role: borrowerInfo.role,
        class: borrowerInfo.role === "Guru" ? "Guru" : `${borrowerInfo.class}.${borrowerInfo.subclass}`,
        phone: formattedPhone,
        date: borrowerInfo.date,
        expiration: Date.now() + 5 * 60 * 1000,
      });
      const encodedQr = Buffer.from(qrContent).toString("base64");
      router.push(`/borrow/${borrowId}#${encodedQr}`);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Mohon isi semua bidang yang diperlukan.',
      });
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15); // 2 weeks + 1 day from today
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <>
      <button
        className="md:w-[30vh] w-[95%] w-full mt-1 py-2 bg-bgnew text-white rounded-lg hover:bg-bgolive font-semibold md:mb-0 md:ml-0 mb-3"
        onClick={() => setIsFormVisible(true)}
      >
        Pinjam Buku
      </button>
    
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative m-3">
            <h2 className="text-xl font-bold text-black">{book.title}</h2>
            <p className="text-gray-700">Penulis: {book.author}</p>
            <p className="text-sm text-gray-500">Lokasi: {book.location}</p>

            {[ 
              { label: "Nama", name: "name", type: "text" },
              { label: "Nomor Telepon", name: "phone", type: "tel" },
              { label: "Tanggal dikembalikan", name: "date", type: "date" },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex items-center mt-2">
                <label className="md:w-[20vh] w-[15vh] text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={label}
                  value={(borrowerInfo as any)[name]}
                  onChange={handleInputChange}
                  className="w-2/3 p-2 border text-gray-700 rounded-lg"
                  min={name === "date" ? getTomorrowDate() : undefined}
                  max={name === "date" ? getMaxDate() : undefined}
                />
              </div>
            ))}

            <div className="flex items-center mt-2">
              <label className="md:w-[20vh] w-[15vh] text-gray-700">Peran</label>
              <select name="role" value={borrowerInfo.role} onChange={handleInputChange} className="w-2/3 p-2 text-gray-700 border rounded-lg">
                <option value="" disabled>Pilih Peran</option>
                <option value="Siswa">Siswa</option>
                <option value="Guru">Guru</option>
              </select>
            </div>

            {borrowerInfo.role === "Siswa" && (
              <>
                <div className="flex items-center mt-2">
                  <label className="md:w-[20vh] w-[15vh] text-gray-700">Kelas</label>
                  <select name="class" value={borrowerInfo.class} onChange={handleInputChange} className="w-2/3 p-2 border rounded-lg">
                    <option className="text-gray-700" value="" disabled>Pilih Kelas</option>
                    {Object.keys(classOptions).map(cls => (
                      <option className="text-gray-700" key={cls} value={cls}>Kelas {cls}</option>
                    ))}
                  </select>
                </div>
                {borrowerInfo.class && (
                  <div className="flex items-center mt-2">
                    <label className="md:w-[20vh] w-[15vh] text-gray-700">Subkelas</label>
                    <select name="subclass" value={borrowerInfo.subclass} onChange={handleInputChange} className="w-2/3 p-2 text-gray-700 border rounded-lg">
                      <option className="text-gray-700" value="" disabled>Pilih Subkelas</option>
                      {classOptions[borrowerInfo.class as keyof typeof classOptions].map(sub => (
                        <option className="text-gray-700" key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            <button className="w-full mt-4 py-2 hover:bg-bgolive text-white rounded-lg bg-bgphotoblue hover:bgplatinum font-semibold" onClick={handleConfirmBorrow}>
              Lanjutkan
            </button>
            <button className="w-full mt-2 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => setIsFormVisible(false)}>
              Batalkan
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookBorrow;