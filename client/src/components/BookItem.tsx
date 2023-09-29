import type { Book } from "@/hooks/useBooks";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import Link from "@mui/material/Link";

export const BookItem = ({ book }: { book: Book }) => (
  <Link href={`/books/${book.id}`}>
    <ImageListItem key={book.id}>
      <img src={book.formats["image/jpeg"]} alt={book.title} loading="lazy" />
      <ImageListItemBar
        position="below"
        title={book.title}
        subtitle={book.authors?.[0]?.name}
        sx={{ padding: 1, bgcolor: "background.paper", color: "white" }}
      />
    </ImageListItem>
  </Link>
);
