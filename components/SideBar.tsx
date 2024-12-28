"use client";

import { ArchiveRestore, Home, Tag } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Vujahday_Script } from "next/font/google";

export const vujay = Vujahday_Script({
  subsets: ["latin"],
  weight: ["400"],
});

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export default function SideBar({ notes }: { notes: Note[] }) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTagSelection = (tag: string) => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tag", tag);
      router.push(`?${params.toString()}`);
    } catch (error) {
      
    }
  };

  return (
    <div
      className={`${theme === "dark" ? "bg-primary" : "bg-white text-black"} relative top-0 left-0 h-screen bg-primary text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64 border-r border-primary-foreground p-4 hidden lg:inline-block`}
    >
      <button
        className="absolute top-4 right-[-50px] md:hidden bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? "X" : "="}
      </button>
      <div className={`${theme === "dark" ? "bg-primary" : "bg-white text-black"} ${vujay.className} text-2xl font-bold underline underline-offset-8`}>NOTESFLOW</div>
      <nav className="my-4">
        <ul className={`${theme === "dark" ? "bg-primary" : " text-black"}`}>
          <li className="flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg">
            <Home />
            <Link
              href="/all-notes"
              className="block p-2 px-4 text-sm rounded-lg"
            >
              All Notes
            </Link>
          </li>
          <li className="flex items-center gap-x-4 hover:bg-gray-700 pl-4 rounded-lg">
            <ArchiveRestore />
            <Link
              href="/archived"
              className="block p-2 px-4 text-sm rounded-lg"
            >
              Archived Notes
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-primary-foreground">
        <h2 className="text-primary-foreground">Tags</h2>
        <div className="grid gap-y-4">
          {notes.map((note) => (
            <div key={note.id} className={`${theme === "dark" ? "bg-primary text-white" : " text-black"} grid gap-y-2`}>
                {note.tags.map((tag, index) => (
                  <span key={index} className="flex items-center gap-x-2" onClick={() => handleTagSelection(tag)}>
                    <Tag />
                    {tag}
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
