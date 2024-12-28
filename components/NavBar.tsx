"use client";

import { usePathname } from "next/navigation";
import Search from "./Search";
import { Settings } from "lucide-react";
import { toCapitalize } from "@/lib/toCapitalize";

export default function NavBar() {
  const getPathName = usePathname();
  const pathname = getPathName.split("/")[1].replace("-", " ");
  return (
    <div className="flex justify-between items-center p-4 border-b border-primary-foreground">
      <span className="text-white text-3xl font-bold">
        {toCapitalize(pathname)}
      </span>

      <div className="flex items-center gap-2">
        <Search />
        <Settings className="text-white" />
      </div>
    </div>
  );
}
