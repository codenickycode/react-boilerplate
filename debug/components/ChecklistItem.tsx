import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import clsx from "clsx";
import styles from "./ChecklistItem.module.css";

export function ChecklistItem({
  Item,
  description,
  check,
  className,
}: {
  Item: ForwardRefExoticComponent<RefAttributes<HTMLElement>>;
  description: string;
  check: (elRef: HTMLElement) => boolean;
  className?: string;
}) {
  const [element, setRef] = useState<HTMLElement | null>(null);
  const status = element === null ? "⏳" : check(element) ? "✅" : "❌";
  return (
    <li className={clsx(styles.root, className)}>
      <Item ref={setRef} /> {" _ "} {status}
      <br />
      <span className={styles.description}>{description}</span>
    </li>
  );
}
