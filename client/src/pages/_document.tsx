import useUserId from "@/hooks/useUserId";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  const { defineUserId } = useUserId();

  useEffect(() => {
    defineUserId();
  }, []);

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
