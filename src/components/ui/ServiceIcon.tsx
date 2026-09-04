import {
  Search,
  Shield,
  Home,
  Briefcase,
  UserCheck,
  Eye,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/data";

/** Maps the `icon` value used across the content JSON to a component. Add an
 *  entry here before adding a new value to the ServiceIcon union. */
const icons: Record<ServiceIconName, LucideIcon> = {
  search: Search,
  shield: Shield,
  home: Home,
  briefcase: Briefcase,
  "user-check": UserCheck,
  eye: Eye,
};

export function ServiceIcon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: ServiceIconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}
