import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-slate-900 text-white hover:bg-slate-700",
        variant === "secondary" &&
          "border border-slate-300 text-slate-900 hover:bg-slate-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
