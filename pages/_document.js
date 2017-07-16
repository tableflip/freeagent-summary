import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='https://unpkg.com/tachyons@4.6.1/css/tachyons.min.css' />
        </Head>
        <body className='black-70'>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
