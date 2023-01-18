import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import { AppPropsWithLayout } from '@/interfaces/common';
import EmptyLayout from '@/components/common/layout/EmptyLayout';
import TopPage from '@/components/TopPage';
import { AuthInit, AuthProvider } from '@/context/AuthContext';
import { store } from '@/store';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import '@/styles/tailwindcss.css';
import '@/styles/global.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthInit>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthInit>
      </AuthProvider>
      <ToastContainer className="z-[999999999999]" />
      <TopPage />
    </Provider>
  );
}
