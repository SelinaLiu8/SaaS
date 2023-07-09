import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../../components/navbar/NavBar'
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
      <Toaster />
    </UserContext.Provider>
  );
}
