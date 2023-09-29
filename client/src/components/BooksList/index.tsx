import { Button, Container, ImageList } from "@mui/material";
import { useBooks } from "@/hooks/useBooks";
import { BookItem } from "../BookItem";
// import styles from "./BooksList.module.css";

export const BooksList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useBooks();

  if (!data) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <ImageList variant="masonry" cols={3} gap={8}>
        {data.pages.map((page) =>
          page.results.map((book) => <BookItem book={book} />),
        )}
      </ImageList>
      {hasNextPage && (
        <Button
          variant="contained"
          component="button"
          onClick={(e) => fetchNextPage()}
          loading={isFetchingNextPage}
          disabled={isFetchingNextPage}
        >
          Load more books
        </Button>
      )}
    </Container>
  );
};
