import styles from './App.module.css';
import ReactIcon from './react.svg';

interface AppProps {
  testCopy: string;
}

export function App(props: AppProps) {
  return (
    <>
      <ReactIcon />
      <h1 className={styles.header}>{props.testCopy}</h1>
      <p>I am working!</p>
    </>
  );
}
