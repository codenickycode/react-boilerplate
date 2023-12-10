import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

interface ChecklistItemProps {
  Item: ForwardRefExoticComponent<RefAttributes<HTMLElement>>;
  description: string;
  check: (elRef: HTMLElement) => boolean;
}

export function ChecklistItem(props: ChecklistItemProps) {
  const [element, setRef] = useState<HTMLElement | null>(null);
  const status = element === null ? "﹖" : props.check(element) ? "✅" : "❌";
  return (
    <div className="flex-0 bg-bg-secondary rounded-md py-2 px-4 text-center">
      <div className="flex">
        <props.Item ref={setRef} /> {" _ "} {status}
      </div>
      <br />
      <span className="text-sm">{props.description}</span>
    </div>
  );
}
