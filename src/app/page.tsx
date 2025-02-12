'use client';

import Homepage from './componentindex/Homepage';
import Navbar from './componentindex/Navbar';
import Intro from './componentindex/Intro';
import Carousel from './componentindex/Facility';
import Guru from './componentindex/Guru';
import Footer from './componentindex/End';
export default function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Intro />
      <Guru />
      <Carousel />
      <Footer />
    </div>
  );
}
