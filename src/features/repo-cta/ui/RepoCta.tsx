import { Button } from '@/shared/ui/atoms';
import { SITE } from '@/shared/config/site';

/* Feature repo-cta — real GitHub button once repoUrl exists, honest TODO otherwise. */

export function RepoCta() {
  if (SITE.repoUrl) {
    return (
      <Button href={SITE.repoUrl} title={SITE.repoLabel}>
        {SITE.repoLabel}
      </Button>
    );
  }
  return (
    <Button variant="todo" title={SITE.repoTodoTitle}>
      {SITE.repoLabel}
    </Button>
  );
}