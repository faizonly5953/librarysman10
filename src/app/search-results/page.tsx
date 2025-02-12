'use client';

import { Suspense } from "react";
import SearchResultsComponent from "./SearchResultsComponent";

export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsComponent />
    </Suspense>
  );
}
