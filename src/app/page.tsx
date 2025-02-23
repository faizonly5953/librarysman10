"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./componentindex/Navbar";
import Homepage from "./componentindex/Homepage";
import Intro from "./componentindex/Intro";
import Carousel from "./componentindex/Facility";
import Guru from "./componentindex/Guru";
import Footer from "./componentindex/End";
import Pinjam from "./componentindex/PengenalanPinjam";
import Ebook from "./componentindex/E-book";
import Manfaat from "./componentindex/Manfaat";
import Ajakan from "./componentindex/Ajakan";
import "./globals.css";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // 2.5s loading
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.p
              className="mt-4 text-lg font-semibold text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }} // No scale effect when entering
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
        </motion.div>
      )}
    </>
  );
}
