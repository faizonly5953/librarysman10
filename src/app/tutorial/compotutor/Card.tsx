import { useState, useEffect } from "react";
import { Minimize } from 'lucide-react';

export default function ImagePopupCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      // Just prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling without changing position
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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
          className="p-4 shadow-lg rounded-xl hover:scale-105 transition-transform cursor-pointer bg-white"
          onClick={() => setSelectedImage(image)}
        >
          <div className="flex justify-center items-center rounded-lg overflow-hidden">
            <img className="w-full h-72 object-cover rounded-lg" src={image} alt={`Card ${index + 1}`} />
          </div>
        </div>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-200 transition-colors text-sm py-2 px-4 rounded-lg"
            >
              <Minimize />
            </button>
            <div className="p-2">
              <img 
                className="w-full max-w-[800px] max-h-[80vh] object-contain rounded-lg"
                src={selectedImage} 
                alt="Popup" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}