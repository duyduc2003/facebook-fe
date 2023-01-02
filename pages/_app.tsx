import { Provider } from 'react-redux';

import { AppPropsWithLayout } from 'interfaces/common';
import EmptyLayout from 'components/common/layout/EmptyLayout';
import { store } from 'store';

import 'tippy.js/dist/tippy.css';
import 'styles/tailwindcss.css';
import 'styles/global.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    // <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </Provider>
  );
}
