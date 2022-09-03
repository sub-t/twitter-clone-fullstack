import '../styles/index.css';
import { AppProps } from 'next/app';
import { AppProvider } from '@/providers/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
