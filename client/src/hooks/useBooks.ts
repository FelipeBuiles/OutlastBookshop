import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const GUTENDEX_URL = "https://gutendex.com/books";

type BooksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};

export type Book = {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Format;
  download_count: number;
};

type Person = {
  birth_year: number | null;
  death_year: number | null;
  name: string;
};

type Format = Record<string, string> & {
  "image/jpeg": string;
};

export const fetchBooks = async (page: number): Promise<BooksResponse> => {
  const res = await fetch(`${GUTENDEX_URL}/?page=${page}`);
  return res.json();
};

export const fetchBook = async (id: number): Promise<Book> => {
  const res = await fetch(`${GUTENDEX_URL}/${id}`);
  return res.json();
};

export const useBooks = () => {
  return useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam = 1 }) => fetchBooks(pageParam),
    getNextPageParam: (lastPage) => lastPage.next?.split("=")[1],
  });
};

export const useBook = (id: number, initialData?: Book) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    initialData,
  });
};
