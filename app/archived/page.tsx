import React from 'react'
import { getArchivedNotes } from '../actions/notes';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';
import NotesPanel from '@/components/NotesPanel';
import BottomNav from '@/components/BottomNav';

export default async function Archived() {
  const notes = await getArchivedNotes();

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
