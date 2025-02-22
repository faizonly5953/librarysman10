import { useState, useEffect } from "react";
import { Minimize } from 'lucide-react';

export default function ImagePopupCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 300);
  };

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEAFhHlcmkQt4OH_auu8MmhRyUqWKd-CFZTg&s",
    "https://m.media-amazon.com/images/I/51zMCUgkP5L._UXNaN_FMjpg_QL85_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqs0-HASbiDZr-JZzahqeCc6ijTqeYQCN2pQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCu4P3jPTnKrFbATY0HXGazLytrFLdZxHQw&s",
    "https://via.placeholder.com/300?text=Image+5",
    "https://via.placeholder.com/300?text=Image+6",
    "https://via.placeholder.com/300?text=Image+7",
    "https://via.placeholder.com/300?text=Image+8",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 md:p-10 mb-10">
      {images.map((image, index) => (
        <div
          key={index}
          className="group p-4 shadow-lg rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer bg-white hover:shadow-2xl"
          onClick={() => setSelectedImage(image)}
        >
          <div className="flex justify-center items-center rounded-lg overflow-hidden">
            <img 
              className="w-full h-72 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" 
              src={image} 
              alt={`Card ${index + 1}`} 
            />
          </div>
        </div>
      ))}

      {selectedImage && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          onClick={handleClose}
        >
          <div className={`absolute inset-0 bg-black/75 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`} />

          <div 
            className={`relative max-w-[90vw] max-h-[90vh] bg-white rounded-xl shadow-2xl ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'} transform transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className={`absolute -top-12 right-0 text-white hover:text-gray-200 transition-all duration-300 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm`}
            >
              <Minimize className="w-6 h-6" />
            </button>

            <div className="p-4">
              <img 
                className="w-full max-w-[800px] max-h-[80vh] object-contain rounded-lg shadow-lg transition-transform duration-300"
                src={selectedImage} 
                alt="Popup" 
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes scaleIn {
          from { 
            transform: scale(0.95);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          from { 
            transform: scale(1);
            opacity: 1;
          }
          to { 
            transform: scale(0.95);
            opacity: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-scaleOut {
          animation: scaleOut 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
