export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href?: string;
}): JSX.Element {
  return (
    <div className={className}>
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <div>{children}</div>
    </div>
  );
}
