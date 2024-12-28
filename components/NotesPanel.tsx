import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import {motion} from 'framer-motion';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';

type Note = {
    id: string;
    title: string;
    content: string;
    tags: string[];
}

const notes: Note[] = [
    {
        id: '1',
        title: 'Note 1',
        content: 'This is the content of the note 1',
        tags: ['tag1', 'tag2'],
    },
    {
        id: '2',
        title: 'Note 2',
        content: 'This is the content of the note 2',
        tags: ['tag1', 'tag3'],
    },
    {
        id: '3',
        title: 'Note 3',
        content: 'This is the content of the note 3',
        tags: ['tag2', 'tag3'],
    },
];



export default function NotesPanel() {
    const [note, selectedNote] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('filter');
    const noteIdInUrl = searchParams.get('noteId');



    const selectednote = noteIdInUrl
    ? notes.find((note) => note.id === noteIdInUrl)
    : null;


    const handleNoteSelection = (noteId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('noteId', noteId);
    
        // Update the URL with shallow routing to avoid full navigation
        // router.push(`/freshdesk/customerService?${params.toString()}`);
      };

      const filteredNotes = notes


      return (
        <div className="grid grid-cols-[.5fr_1.5fr] w-[90%] h-[90vh] mx-auto gap-8">
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
            {/* <h1 className="text-2xl font-bold text-gray-700">Notes Panel</h1> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-x-2">
                  Create Note <PlusCircle />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a new note</DialogTitle>
                </DialogHeader>

  
                <DialogFooter>
                  <Button type="submit">
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <span className="text-secondary text-2xl font-semibold">
              ({filteredNotes.length})
            </span>
          </div>
  
          <div className="mt-6 h-[75vh] overflow-y-scroll w-full border border-gray-200 rounded-lg shadow-lg p-4 bg-white">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`mb-4 p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ${
                    note.id === noteIdInUrl
                      ? 'bg-blue-100'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {note.title}
                  </h2>

                </div>
              ))
            ) : (
              <p className="text-gray-600">No Notes found for this filter.</p>
            )}
          </div>
        </div>
  
        {/* Display selected note details */}
        {selectednote && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[84vh] p-6 border border-gray-200 rounded-lg shadow-lg bg-white flex flex-col gap-6"
          >

            <h1>Details</h1>
          </motion.div>
        )}
      </div>
      )
}
