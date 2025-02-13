'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TranslatableHeader from './TranslatableHeader';

const Carousel = () => {
  // State untuk menyimpan gambar yang diupload
  const [slides, setSlides] = useState<{ id: number; image: string | ArrayBuffer | null; content: string }[]>([
    { id: 1, image: "Perpustakaan_1.jpg", content: 'Slide 1' },
    { id: 2, image: null, content: 'Slide 2' },
    { id: 3, image: null, content: 'Slide 3' },
    { id: 4, image: null, content: 'Slide 4' }
  ]);

  // Handler untuk upload gambar
  interface Slide {
    id: number;
    image: string | ArrayBuffer | null;
    content: string;
  }

  interface ImageUploadEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleImageUpload = (e: ImageUploadEvent, slideId: number): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          setSlides(slides.map((slide: Slide) => 
            slide.id === slideId 
              ? { ...slide, image: event.target!.result }
              : slide
          ));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id='tawaran' className="w-full px-4 py-8 bg-gray-50">
      <TranslatableHeader 
        value="What We Offer" 
        translate="Apa Yang Kami Tawarkan" 
        className="text-center text-black text-5xl mt-10 font-serif" 
      />
      <div className="container mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          slidesPerView={3}
          spaceBetween={30}
          navigation={{
            nextEl: '#slider-button-right',
            prevEl: '#slider-button-left',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: '.swiper-pagination',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-12"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-4 hover:shadow-xl">
                <div className="bg-bgnavbarhover h-96 flex flex-col justify-center items-center relative">
                  {slide.image ? (
                    <img 
                      src={typeof slide.image === 'string' ? slide.image : undefined} 
                      alt={`Slide ${slide.id}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white drop-shadow-md">
                      {slide.content}
                    </span>
                  )}
                  <label className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, slide.id)}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="p-6 text-center bg-orange-200">
                  <p className="text-black">Additional content for slide {slide.id}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="absolute z-10 top-1/2 right-[1px] -translate-y-1/2 w-full flex justify-between px-12">
          <button
            id="slider-button-left"
            className="bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-indigo-50 transition-colors"
          >
            <svg 
              className="w-6 h-6 text-indigo-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            id="slider-button-right"
            className="bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-indigo-50 transition-colors"
          >
            <svg 
              className="w-6 h-6 text-indigo-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination */}
        <div className="swiper-pagination text-center mt-4"></div>
      </div>
    </div>
  );
};

export default Carousel;