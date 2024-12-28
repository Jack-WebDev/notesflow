"use client";
import { ArchiveRestore, Home, Search, Settings, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: "/all-notes", label: "Home", Icon: Home },
    { href: "/archived", label: "Archived", Icon: ArchiveRestore },
    { href: "/search", label: "Search", Icon: Search },
    { href: "/tags", label: "Tags", Icon: Tag },
    { href: "/settings", label: "Settings", Icon: Settings },
  ];
  return (
    <div>
      <ul className="flex justify-evenly items-center gap-4 p-4 lg:hidden absolute bottom-0 left-0 right-0 border-t border-primary-foreground">
        {navItems.map(({ href, label, Icon }, index) => (
          <li
            key={href}
            className={`w-full ${
              index !== navItems.length - 1
                ? "md:border-r border-primary-foreground"
                : ""
            } `}
          >
            <Link
              href={href}
              className={`grid justify-items-center gap-y-2 hover:bg-gray-800 py-2 p-x md:px-0 rounded-md md:mx-2 ${
                pathname === href ? "text-secondary" : "text-white"
              }`}
            >
              <Icon
                className={`${
                  pathname === href ? "text-secondary" : "text-white"
                }`}
              />
              <span className="hidden md:inline-block">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
