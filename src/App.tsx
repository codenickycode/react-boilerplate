import styles from "./App.module.css";
import ReactIcon from "./assets/react.svg";

interface AppProps {
  testCopy: string;
}

export function App(props: AppProps) {
  return (
    <>
      <ReactIcon />
      <h1 className={styles.header}>{props.testCopy}</h1>
      <h2>Build Checklist</h2>
      <ol>
        <li>{"React Icon (svg loader)"}</li>
        <li>{"Blue header (css modules)"}</li>
        <li>{"Open Sans (font loader)"}</li>
        <li>{`process.env.secret=${process.env.secret} (dot env plugin)`}</li>
      </ol>
    </>
  );
}
