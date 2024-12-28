"use client";

import { ArchiveRestore, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative top-0 left-0 h-screen bg-primary text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64 border-r border-primary-foreground p-4 hidden lg:inline-block`}
    >
      <button
        className="absolute top-4 right-[-50px] md:hidden bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? "X" : "="}
      </button>
      <div className="lgo">NOTESFLOW</div>
      <nav className="my-4">
        <ul className="space-y-4 px-4">
          <li className="flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg">
            <Home />
            <Link href="/allnotes" className="block p-2 px-4 text-sm rounded-lg">
              All Notes
            </Link>
          </li>
          <li className="flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg">
            <ArchiveRestore />
            <Link href="/archived" className="block p-2 px-4 text-sm rounded-lg">
              Archived Notes
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-primary-foreground">
        <h2 className="text-primary-foreground">Tags</h2>
      </div>
      
    </div>
  );
}
