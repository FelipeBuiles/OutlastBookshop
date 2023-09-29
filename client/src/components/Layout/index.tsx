import CssBaseline from '@mui/material/CssBaseline';

import styles from '@/styles/Home.module.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const Layout = ({children}: React.PropsWithChildren) => (
  <main className={styles.main}>
    <CssBaseline />
    {children}
  </main>
);