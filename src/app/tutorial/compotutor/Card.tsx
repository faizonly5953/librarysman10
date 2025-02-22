export default function Card() {
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
        <div key={index} className="bg-white p-6 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="bg-gray-100 h-72 flex justify-center items-center rounded-lg overflow-hidden">
            <img className="w-full h-full object-cover" src={image} alt={`Card ${index + 1}`} />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Card {index + 1}</h3>
            <p className="text-gray-600 mt-2">This is a description of the card.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
