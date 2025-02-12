import { Timestamp } from "firebase/firestore";

export interface Book {
    id: string;
    title: string;
    author: string;
    rating: number;
    cover: string;
    genre: string;
    totalCopies: number;
    availableCopies: number;
    currentlyBorrowed: number;
    location: string;
    createdAt: Timestamp;
  }