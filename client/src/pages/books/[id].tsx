import { useRouter } from "next/router";
import type { Book } from "@/hooks/useBooks";
import { useBook, fetchBook } from "@/hooks/useBooks";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Container,
  Box,
  Chip,
  useMediaQuery,
  AppBar,
} from "@mui/material";
import FavoriteIcon from "@/components/FavoriteIcon";
import useIsMobile from "@/hooks/useIsMobile";
import BackIcon from "@/components/BackIcon";

interface Props {
  book: Book;
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const book = await fetchBook(+params.id);

  return {
    props: {
      book,
    },
  };
}

const BookDetails = (props: Props) => {
  const router = useRouter();
  const bookId = router.query?.id ? +router.query?.id : props.book.id;
  const { data } = useBook(bookId, props.book);
  const isMobile = useIsMobile();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "background.paper",
            pl: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton size="large" onClick={goBack}>
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data?.title}
          </Typography>
        </AppBar>
        <Card
          sx={{
            display: "flex",
            width: 500,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            mt: 8,
            mb: 1,
          }}
        >
          <CardMedia
            image={data?.formats["image/jpeg"]}
            alt={data?.title}
            component="img"
            sx={{ width: 200, m: 1 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" color="white">
                {data?.title}
              </Typography>
              <Typography variant="body2" color="white">
                {data?.authors?.[0]?.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                {data?.subjects?.map((subject) => (
                  <Chip
                    label={subject}
                    sx={{ m: 0.2, fontSize: 10, color: "white" }}
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <IconButton size="large">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default BookDetails;
