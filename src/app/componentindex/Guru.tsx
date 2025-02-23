import Image from 'next/image';
import TranslatableHeader from './TranslatableHeader';

const Guru = () => {
  const teachers = [
    {
      id: 1,
      name: 'Pak Budi',
      subject: 'Matematika',
      description: 'Pak Budi adalah guru matematika dengan pengalaman mengajar lebih dari 10 tahun.',
      image: 'https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg',
    },
    {
      id: 2,
      name: 'Bu Ani',
      subject: 'Bahasa Inggris',
      description: 'Bu Ani mengajar Bahasa Inggris dengan metode kreatif dan interaktif.',
      image: 'https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg',
    },
    {
      id: 3,
      name: 'Pak Joko',
      subject: 'Fisika',
      description: 'Pak Joko memiliki pendekatan inovatif dalam mengajarkan konsep-konsep fisika.',
      image: 'https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg',
    },
  ];

  return (
    <section id="guru" className="w-full bg-slate-50 min-h-screen md:py-16 py-10 px-4 cursor-default">
      <TranslatableHeader
        value="Meet Our Teachers"
        translate="Kenali Guru"
        className="text-gray-800 text-center text-4xl md:text-5xl mb-16"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-bgphotoblue rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex flex-col items-center transform transition-all duration-300"
              >
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                  <div className="absolute inset-0 bg-white rounded-full p-3 transform transition-all duration-300 hover:scale-105 hover:border-8 hover:border-bgolive">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">
                  {teacher.name}
                </h3>
                <p className="text-gray-700 text-lg mb-2">{teacher.subject}</p>
                <p className="text-black text-center text-sm">
                  {teacher.description}
                </p>
              </div>
            ))}
          </div>
            <div className="mt-12 bg-bgplatinum bg-opacity-95 md:rounded-2xl rounded-lg p-6 md:p-8 max-h-64 overflow-y-auto custom-scrollbar">
            <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed">
              Guru adalah seseorang yang bertugas mendidik, mengajar, membimbing, dan menginspirasi 
              siswa dalam proses belajar. Selain memberikan pengetahuan akademis, seorang guru juga 
              berperan dalam membentuk karakter dan nilai-nilai moral siswa, membantu mereka berkembang 
              menjadi individu yang kompeten dan berintegritas. Guru sering dianggap sebagai panutan, 
              yang tidak hanya berbagi ilmu tetapi juga memberikan motivasi dan dukungan untuk mencapai 
              potensi terbaik muridnya.
            </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Guru;