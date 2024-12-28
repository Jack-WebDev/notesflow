"use client";

import { usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import { Settings } from "lucide-react";
import { toCapitalize } from "@/lib/toCapitalize";
import { useTheme } from "next-themes";

export default function NavBar() {
  const getPathName = usePathname();
  const { theme } = useTheme();
  const pathname = getPathName.split("/")[1].replace("-", " ");
  const router = useRouter();
  return (
    <div
      className={`${
        theme === "dark" ? "bg-primary" : "bg-white text-black"
      } flex justify-between items-center p-4 border-b border-primary-foreground`}
    >
      <span className={`${theme === "dark" ? "bg-primary text-white" : "text-black"} text-3xl font-bold`}>
        {toCapitalize(pathname)}
      </span>

      <div className="flex items-center gap-2">
        <Search />
        <Settings
          className={`${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"} cursor-pointer`}
          onClick={() => router.push("/settings")}
        />
      </div>
    </div>
  );
}
