'use client';

import Homepage from './componentindex/Homepage';
import Navbar from './componentindex/Navbar';
import Intro from './componentindex/Intro';
import Carousel from './componentindex/Facility';
import Guru from './componentindex/Guru';
import Footer from './componentindex/End';
import Pinjam from './componentindex/PengenalanPinjam';
import Ebook from './componentindex/E-book';
import Manfaat from './componentindex/Manfaat';
import Ajakan from './componentindex/Ajakan';
export default function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Intro />
      <Guru />
      <Carousel />
      <Pinjam />
      <Ebook />
      <Manfaat />
      <Ajakan />
      <Footer />
    </div>
  );
}
