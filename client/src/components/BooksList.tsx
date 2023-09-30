import {
  AppBar,
  Box,
  Container,
  ImageList,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useBooks } from "@/hooks/useBooks";
import { BookItem } from "./BookItem";
import useIsMobile from "@/hooks/useIsMobile";

export const BooksList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useBooks();

  const isMobile = useIsMobile();

  if (!data) {
    return null;
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.paper",
          pl: 1,
          height: 48,
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Outlast Bookstore</Typography>
      </AppBar>
      <Container maxWidth="md">
        <ImageList
          variant="masonry"
          cols={isMobile ? 2 : 5}
          gap={8}
          sx={{ mt: 10 }}
        >
          {data.pages.map((page) =>
            page.results.map((book) => <BookItem book={book} />),
          )}
        </ImageList>
        {hasNextPage && (
          <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="contained"
              component="button"
              onClick={() => fetchNextPage()}
              loading={isFetchingNextPage}
              disabled={isFetchingNextPage}
              sx={{ bgcolor: "background.paper" }}
            >
              Load more books
            </LoadingButton>
          </Box>
        )}
      </Container>
    </>
  );
};
