"use client"
import React from "react";
import Opening from "./compotutor/Opening";
import Card from "./compotutor/Card";
import Footer from "../componentindex/End";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Opening />
      <Card />
      <Footer />
    </div>
  );
}
