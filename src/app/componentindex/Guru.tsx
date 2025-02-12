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
    <section id='guru' className="w-full mx-auto p-6 bg-background min-h-screen">
    <TranslatableHeader value="Meet Our Teachers" translate="Kenali Guru" className="text-black text-center w-full font-serif text-5xl mt-20 mb-10"/>
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col p-6 border rounded-3xl shadow-lg w-full max-w-6xl bg-bgnavbarhover transition-all duration-300">
        {/* Header untuk Guru */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex flex-col items-center text-center w-[30%]">
              <div className="md:w-[50vh] md:h-[50vh] w-[30vh] h-[30vh] rounded-full overflow-hidden border-white border-8 hover:border-[1vw] transition-all duration:300 mb-4">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={400}
                  height={150}
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white">{teacher.name}</h3>
            </div>
          ))}
        </div>
        <div className=''>
        <h1 className='text-black text-center mt-10 w-full pl-8 pr-8 bg-bgnavbar rounded-2xl p-7'>Guru adalah seseorang yang bertugas mendidik, mengajar, membimbing, dan menginspirasi siswa dalam proses belajar. Selain memberikan pengetahuan akademis, seorang guru juga berperan dalam membentuk karakter dan nilai-nilai moral siswa, membantu mereka berkembang menjadi individu yang kompeten dan berintegritas. Guru sering dianggap sebagai panutan, yang tidak hanya berbagi ilmu tetapi juga memberikan motivasi dan dukungan untuk mencapai potensi terbaik muridnya.</h1>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Guru;
