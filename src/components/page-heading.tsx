import Link from "next/link";
import { Icon } from "./icon";
export function PageHeading({
  title,
  description,
  back = "/explore",
  backLabel = "Explore",
}: {
  title: string;
  description?: string;
  back?: string;
  backLabel?: string;
}) {
  return (
    <header className="page-heading">
      <Link className="back-link" href={back}>
        <span aria-hidden="true">←</span> {backLabel}
      </Link>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
export function EmptyState({
  title,
  children,
  href = "/concierge",
  action = "Ask Concierge",
}: {
  title: string;
  children: React.ReactNode;
  href?: string;
  action?: string;
}) {
  return (
    <section className="empty-state">
      <Icon name="compass" />
      <h2>{title}</h2>
      <p>{children}</p>
      <Link className="button" href={href}>
        {action}
        <Icon name="arrow" />
      </Link>
    </section>
  );
}
