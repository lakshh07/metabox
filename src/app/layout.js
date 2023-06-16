"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { useState } from "react";
import LoadingContext from "./context/loading";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Providers>{children}</Providers>
        </LoadingContext.Provider>
        <script>
          <title>MetaBox</title>
        </script>
      </body>
    </html>
  );
}
