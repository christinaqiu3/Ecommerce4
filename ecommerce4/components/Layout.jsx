import React from 'react';
import Head from 'next/head';
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from './Navbar';
import Footer from './Footer';


export const metadata = {
  title: 'Next.js 13 with Clerk',
}

export default function Layout ({ children, showHeaderAndFooter = true }) {
  return (
    <ClerkProvider>
    <div className="layout">
      <Head>
        <title>CQ store</title>
      </Head>
      {showHeaderAndFooter && (
        <>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
      </>
      )}
      {!showHeaderAndFooter && <main className="main-container">{children}</main>}
    </div>
    </ClerkProvider>
  );
};
