import { QueryClient, dehydrate } from "@tanstack/react-query";

import { BooksList } from "@/components/BooksList";
import { fetchBooks } from "@/hooks/useBooks";

export default function Home() {
  return <BooksList />;
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchInfiniteQuery({
//     queryKey: ["books"],
//     queryFn: () => fetchBooks(1),
//     getNextPageParam: (lastPage) => lastPage.next,
//   });

//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// }
