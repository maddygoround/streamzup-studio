import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from "react";
React.useLayoutEffect = React.useEffect;
export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};
