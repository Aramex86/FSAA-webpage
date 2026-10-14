import { Button } from '@/shared/ui/atoms';

export default function NotFound() {
  return (
    <article>
      <div className="crumb">Error · FSAA docs</div>
      <h1>404 — page not found</h1>
      <p>
        This page does not exist in the FSAA docs. It may have been renamed during the draft
        phase — check the sidebar navigation or go back home.
      </p>
      <div className="cta">
        <Button href="/">Back to Home</Button>
        <Button variant="ghost" href="/architecture">
          Read the architecture
        </Button>
      </div>
    </article>
  );
}