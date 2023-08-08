import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../../components/NavBar'
import { UserContext } from '../../lib/context';
import { useUserData } from '../../lib/hooks';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from '../../state_management/Store';

export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  const isLoginPage = useRouter().pathname === '/enter';
  const shouldShowHeader = !isLoginPage;

  return (
    <Provider store={store}>
      <UserContext.Provider value={userData}>
        {shouldShowHeader && <NavBar />}
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </Provider>

  );
}
