import type { Book } from "@/hooks/useBooks";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./BookItem.module.css";

export const BookItem = ({ book }: { book: Book }) => (
  <ImageListItem key={book.id}>
    <img src={book.formats["image/jpeg"]} alt={book.title} loading="lazy" />
    <ImageListItemBar
      position="below"
      title={book.title}
      subtitle={book.authors?.[0]?.name}
      className={styles.titleBar}
    />
  </ImageListItem>
);
