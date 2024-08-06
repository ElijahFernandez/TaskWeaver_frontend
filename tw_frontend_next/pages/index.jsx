import Head from 'next/head';
import ChatComponent from '../components/ChatComponent';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat with TaskWeaver</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Chat with TaskWeaver</h1>
        <ChatComponent />
      </main>
    </div>
  );
}
