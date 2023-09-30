import { useState, forwardRef } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextLink from "next/link";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";

const LinkBehaviour = forwardRef<HTMLAnchorElement, any>(
  function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
  },
);

const theme = createTheme({
  palette: {
    background: {
      paper: "#39516c",
    },
  },
  typography: {
    fontFamily: "Futura",
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Outlast Bookstore</title>
          <meta name="description" content="Outlast Take Home Project" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <main>
            <CssBaseline />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </Hydrate>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
