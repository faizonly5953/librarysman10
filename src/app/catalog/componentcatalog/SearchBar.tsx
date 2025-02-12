"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search-results?query=${searchTerm}`);
    }
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
      <input
        type="text"
        placeholder="Search by title, author, or genre..."
        className="w-full pl-12 pr-4 py-3 rounded-2xl text-neutral-800 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#e6c69c] transition-all duration-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
