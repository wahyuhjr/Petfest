"use client";

import Head from "next/head";
import { Navbar } from "./navbar";
import Footer from "./Footer";

const MainLayout = ({ children,title }) => {
  return (
    <>
      {/* SEO HEAD */}
      <Head>
        <title>{title ? `{$title} | My Website` : "Home Page"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar */}
      <Navbar />
      {/* Navbar */}

      {/* Main Content */}
      <main className="">{children}</main>
      {/* Main Content */}

      {/* Footer */}
        <Footer />
      {/* Footer */}
    </>
  );
};

export default MainLayout;