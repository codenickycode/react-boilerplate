import styles from './App.module.css';

interface AppProps {
  testCopy: string;
}

export function App(props: AppProps) {
  return (
    <>
      <h1 className={styles.header}>{props.testCopy}</h1>
    </>
  );
}
