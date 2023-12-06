import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

export function ChecklistItem({
  Item,
  description,
  check,
}: {
  Item: ForwardRefExoticComponent<RefAttributes<HTMLElement>>;
  description: string;
  check: (elRef: HTMLElement) => boolean;
}) {
  const [element, setRef] = useState<HTMLElement | null>(null);
  const status = element === null ? "﹖" : check(element) ? "✅" : "❌";
  return (
    <div className="flex-0 bg-bg-secondary rounded-md py-2 px-4 text-center">
      <div className="flex">
        <Item ref={setRef} /> {" _ "} {status}
      </div>
      <br />
      <span className="text-sm">{description}</span>
    </div>
  );
}
