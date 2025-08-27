import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function NavItem({ icon, href, children, className }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 py-3 text-sm font-medium transition-colors",
        isActive
          ? "bg-(--background) text-gray-900"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        className
      )}
    >
      <span className={isActive ? "text-gray-900" : "text-gray-500"}>
        {icon}
      </span>
      <span>{children}</span>
    </Link>
  );
}
