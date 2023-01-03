import { Provider } from 'react-redux';

import { AppPropsWithLayout } from 'interfaces/common';
import EmptyLayout from 'components/common/layout/EmptyLayout';
import { store } from 'store';

import 'tippy.js/dist/tippy.css';
import 'styles/tailwindcss.css';
import 'styles/global.scss';
import 'animate.css';
import { AuthProvider, useAuth } from 'context/auth';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    // <Provider store={store}>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    // </Provider>
  );
}
