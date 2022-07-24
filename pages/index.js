import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kooltz Utilities</title>
        <meta name="description" content="Kooltz Utilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Kooltz Utilities</h1>

        <p className={styles.description}>----</p>

        <div className={styles.grid}>
          <a href="./tag-extractor" className={styles.card}>
            <h2>Tag Extractor</h2>
            <p>Naver Blog Tag Extractor</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Blank Blank Blank</h2>
            <p>Empty</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Blank Blank Blank</h2>
            <p>Empty</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Blank Blank Blank</h2>
            <p>Empty</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
