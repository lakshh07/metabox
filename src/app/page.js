"use client";
import styles from "./page.module.css";
import MetaBox from "@/app/components/Box";
import LoadingContext from "./context/loading";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <main className={styles.main}>
        <MetaBox bg={"white"} color={"#1A202C"}></MetaBox>
      </main>
    </LoadingContext.Provider>
  );
}
