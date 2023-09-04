import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, showHeaderAndFooter = true }) => {
  return (
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
  );
};

export default Layout;