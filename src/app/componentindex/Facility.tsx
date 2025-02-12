'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TranslatableHeader from './TranslatableHeader';

const Carousel = () => {
  return (
    <div id='tawaran' className="w-full px-4 py-8 bg-gray-50">
      <TranslatableHeader value="What We Offer" translate="Apa Yang Kami Tawarkan" className="text-center text-black text-5xl mt-10 font-serif" />
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
          {[1, 2, 3, 4].map((slide) => (
            <SwiperSlide key={slide}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-4 hover:shadow-xl">
                <div className="bg-bgnavbarhover h-96 flex justify-center items-center">
                  <span className="text-3xl font-bold text-white drop-shadow-md">
                    Slide {slide}
                  </span>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600">Additional content for slide {slide}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="absolute z-10 top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
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