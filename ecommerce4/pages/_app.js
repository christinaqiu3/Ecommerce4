import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from "@clerk/nextjs";
import { SnackbarProvider } from 'notistack';
import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    </SnackbarProvider>
  )
}

export default MyApp