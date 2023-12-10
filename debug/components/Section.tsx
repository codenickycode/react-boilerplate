interface SectionProps {
  title: string;
  children: React.ReactNode;
  divide?: boolean;
}

export function Section(props: SectionProps) {
  return (
    <>
      <h3>{props.title}</h3>
      <div className="py-0 px-4">{props.children}</div>
      {props.divide && (
        <div className="my-8 mx-0 border-b-[1px] border-divider-primary" />
      )}
    </>
  );
}
