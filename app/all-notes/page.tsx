import BottomNav from "@/components/BottomNav";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import React from "react";

export default function AllNotes() {
  return (
    <div className="h-screen bg-primary grid lg:grid-cols-[0.3fr_2fr]">
      <SideBar />
      <div>
        <NavBar />
        <h2>Home</h2>
      </div>
      <BottomNav/>
    </div>
  );
}
