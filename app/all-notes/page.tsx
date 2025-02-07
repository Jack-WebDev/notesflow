import BottomNav from "@/components/BottomNav";
import NavBar from "@/components/NavBar";
import NotesPanel from "@/components/NotesPanel";
import SideBar from "@/components/SideBar";
import React from "react";
import { getNotes } from "../actions/notes";

export default async function AllNotes() {
  const notes = await getNotes();
  return (
    <div className="h-screen bg-primary grid lg:grid-cols-[0.3fr_2fr]">
      <SideBar notes={notes} />
      <div>
        <NavBar />
        <NotesPanel notes={notes} />
      </div>
      <BottomNav/>
    </div>
  );
}
