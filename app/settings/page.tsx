import BottomNav from "@/components/BottomNav";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import React from "react";
import { getNotes } from "../actions/notes";
import SettingsPanel from "@/components/Settings";

export default async function Settings() {
  const notes = await getNotes();
  return (
    <div className="h-screen bg-primary grid lg:grid-cols-[0.3fr_2fr]">
      <SideBar notes={notes} />
      <div>
        <NavBar />
        <SettingsPanel/>
      </div>
      <BottomNav />
    </div>
  );
}
