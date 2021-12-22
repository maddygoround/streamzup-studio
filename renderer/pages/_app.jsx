import React from 'react';
import Head from 'next/head';
import { ClientProvider } from '../utils/ClientContext';
// import 'antd/dist/antd.css';
// import "bootstrap/scss/bootstrap.scss";
// import '../styles/global.scss'
require("bootstrap/dist/css/bootstrap.min.css");
require("../styles/global.less");

function MyApp({ Component, pageProps }) {
  return (
    <ClientProvider>
      <React.Fragment>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    </ClientProvider>
  );
}

export default MyApp;
