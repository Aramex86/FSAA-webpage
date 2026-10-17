/* Molecule — article header block: crumb, title, lede. */

type PageHeaderProps = {
  crumb: string;
  title: string;
  lede?: React.ReactNode;
};

export function PageHeader({ crumb, title, lede }: PageHeaderProps) {
  return (
    <>
      <div className="crumb">{crumb}</div>
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </>
  );
}
