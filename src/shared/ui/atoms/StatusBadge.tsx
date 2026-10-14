import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/* Atom — phase status (roadmap rows). */

type StatusBadgeProps = {
  children: ReactNode;
  status: "prog" | "plan" | "done";
  className?: string;
};

export function StatusBadge({ children, status, className }: StatusBadgeProps) {
  return <span className={cn("status", status, className)}>{children}</span>;
}
