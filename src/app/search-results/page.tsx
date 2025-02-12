"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchResultsComponent from "./SearchResultsComponent";

const SearchResults = () => {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResultsComponent />
    </Suspense>
  );
};

export default SearchResults;
