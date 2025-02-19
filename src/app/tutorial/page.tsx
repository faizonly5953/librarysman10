"use client"
import React from "react";
import Opening from "./compotutor/Opening";
import Card from "./compotutor/Card";
import Footer from "../componentindex/End";
import Navbar from "../componentindex/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Opening />
      <Card />
      <Footer />
    </div>
  );
}
