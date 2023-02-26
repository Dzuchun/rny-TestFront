import { Review } from "./review";

export interface Book {
    id?: number;
    title?: string;
    author?: string;
    cover?: string;
    genre?: string;
    content?: string;
    rating?: number;
    reviewsNumber?: number;
    reviews?: Review[];
}