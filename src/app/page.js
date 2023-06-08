"use client";
import styles from "./page.module.css";
import MetaBox from "@/app/components/Box";

export default function Home() {
  return (
    <main className={styles.main}>
      <MetaBox bg={"white"} color={"black"}></MetaBox>
    </main>
  );
}
