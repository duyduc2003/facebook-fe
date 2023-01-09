import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AppPropsWithLayout } from 'interfaces/common';
import EmptyLayout from 'components/common/layout/EmptyLayout';
import { store } from 'store';
import { AuthInit, AuthProvider } from 'context/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'styles/tailwindcss.css';
import 'styles/global.scss';
import 'animate.css';
import { toastAlert } from 'components/ToastAlert';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    // <Provider store={store}>
    <>
      <AuthProvider>
        <AuthInit>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthInit>
      </AuthProvider>
      <ToastContainer className="z-[999999999999]" />
    </>
    // </Provider>
  );
}
