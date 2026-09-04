import {
  Search,
  Shield,
  Home,
  Briefcase,
  UserCheck,
  Eye,
  Target,
  Gem,
  type LucideIcon,
} from "lucide-react";

/** Every icon the content JSON is allowed to name. Add the entry below before
 *  adding a value here, or the map stops type-checking. */
export type IconName =
  | "search"
  | "shield"
  | "home"
  | "briefcase"
  | "user-check"
  | "eye"
  | "target"
  | "gem";

const icons: Record<IconName, LucideIcon> = {
  search: Search,
  shield: Shield,
  home: Home,
  briefcase: Briefcase,
  "user-check": UserCheck,
  eye: Eye,
  target: Target,
  gem: Gem,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const LucideIconComponent = icons[name];
  return (
    <LucideIconComponent
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}
