import '../styles/globals.css';
import { AppPropsWithLayout } from 'interfaces/common';
import EmptyLayout from 'components/common/Layout/EmptyLayout';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
