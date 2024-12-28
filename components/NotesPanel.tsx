"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  ArchiveRestore,
  Clock,
  Edit,
  PlusCircle,
  RotateCcw,
  Tag,
  Trash,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  archiveNote,
  createNote,
  deleteNote,
  restoreNote,
  updateNote,
} from "@/app/actions/notes";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useTheme } from "next-themes";

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

type NoteData = {
  title: string;
  content: string;
  tags: string[];
};

export default function NotesPanel({ notes }: { notes: Note[] }) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const noteIdInUrl = searchParams.get("noteId");
  const [noteData, setNoteData] = useState<NoteData>({
    title: "",
    content: "",
    tags: [],
  });

  const handleNoteSelection = (noteId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("noteId", noteId);
    router.push(`?${params.toString()}`);

    setSelectedNote(notes.find((note) => note.id === noteId) || null);
  };

  const filteredNotes = notes.filter((note) => {
    const searchTag = searchParams.get("tag"); // Get 'tag' query param
    const lowerCaseSearch = search?.toLowerCase(); // Ensure 'search' is processed safely

    // If no search term or tag, return all notes
    if (!lowerCaseSearch && !searchTag) return true;

    // Check if the title includes the search term
    const matchesTitle = lowerCaseSearch
      ? note.title.toLowerCase().includes(lowerCaseSearch)
      : false;

    // Check if any tag matches the tag query parameter
    const matchesTag = note.tags.some((tag) => {
      const lowercaseTag = tag.toLowerCase();
      const matchesTagParam = searchTag
        ? lowercaseTag.includes(searchTag.toLowerCase())
        : false;
      const matchesSearchTerm = lowerCaseSearch
        ? lowercaseTag.includes(lowerCaseSearch)
        : false;
      return matchesTagParam || matchesSearchTerm;
    });

    // Return true if either title matches the search or tags match the searchTag
    return matchesTitle || matchesTag;
  });

  const handleCreateNote = async () => {
    let cleanTags: string[] = [];

    // First ensure noteData.tags exists
    if (noteData.tags) {
      // Handle if tags is a string
      if (typeof (noteData.tags as string | string[]) === "string") {
        cleanTags = (noteData.tags as unknown as string)
          .split(/[\s,]+/)
          .filter(Boolean);
      }
      // Handle if tags is an array
      else if (Array.isArray(noteData.tags)) {
        if (noteData.tags.length === 1) {
          // Single string in array - split by spaces and commas
          cleanTags = noteData.tags[0].split(/[\s,]+/).filter(Boolean);
        } else {
          // Multiple strings - split each by commas and flatten
          cleanTags = noteData.tags
            .map((tag) => tag.split(","))
            .flat()
            .filter(Boolean);
        }
      }

      // Remove duplicates
      cleanTags = Array.from(new Set(cleanTags));
    }

    try {
      await createNote(noteData.title, noteData.content, cleanTags);
      location.reload();
    } catch (error) {
      console.error("Failed to create note:", error);
      toast.error(
        "An error occurred while creating the note. Please try again."
      );
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      location.reload();
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error(
        "An error occurred while deleting the note. Please try again."
      );
    }
  };

  const handleEditNote = async (id: string) => {
    try {
      if (!selectedNote) return;
      const updatedData = {
        title: noteData.title === "" ? selectedNote?.title : noteData.title,
        content:
          noteData.content === "" ? selectedNote?.content : noteData.content,
        tags: noteData.tags.length === 0 ? selectedNote?.tags : noteData.tags,
      };

      await updateNote(
        id,
        updatedData.title,
        updatedData.content,
        updatedData.tags
      );
      location.reload();
    } catch (error) {
      console.error("Failed to update note:", error);
      toast.error(
        "An error occurred while updating the note. Please try again."
      );
    }
  };

  const handleArchiveNote = async (id: string) => {
    try {
      await archiveNote(id);
      location.reload();
    } catch (error) {
      console.error("Failed to archive note:", error);
      toast.error(
        "An error occurred while archiving the note. Please try again."
      );
    }
  };

  const handleRestoreNote = async (id: string) => {
    try {
      await restoreNote(id);
      location.reload();
    } catch (error) {
      console.error("Failed to restore note:", error);
      toast.error(
        "An error occurred while restoring the note. Please try again."
      );
    }
  };

  return (
    <div className={`${theme === "dark" ? "bg-primary" : "bg-white text-black"} grid grid-cols-[.4fr_1.5fr] h-full px-8 gap-8 pt-4`}>
      <div>
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4 gap-x-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex w-full bg-secondary text-white rounded-lg px-4 py-6 hover:bg-secondary">
                <PlusCircle />
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new note</DialogTitle>
              </DialogHeader>
              <div>
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="Title"
                    value={noteData.title}
                    onChange={(e: { target: { value: any } }) =>
                      setNoteData({ ...noteData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Content"
                    value={noteData.content}
                    onChange={(e) =>
                      setNoteData({ ...noteData, content: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <Input
                    placeholder="Tags (comma separated)"
                    value={noteData.tags}
                    onChange={(e: { target: { value: any } }) =>
                      setNoteData({
                        ...noteData,
                        tags: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleCreateNote}
                  className="bg-secondary text-white hover:text-secondary"
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="text-secondary text-2xl font-semibold">
            ({filteredNotes.length})
          </span>
        </div>

        <div className="w-full">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`${theme === "dark" ? "bg-primary text-white" : " text-black"} mb-4 grid gap-y-2 p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ${
                  note.id === noteIdInUrl
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => handleNoteSelection(note.id)}
              >
                <h2 className={`text-xl font-semibold ${theme === "dark" ? " text-white" : " text-black"}`}>
                  {note.title}
                </h2>
                <div className="flex gap-2 text-sm flex-wrap">
                  {note.tags
                    .slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 px-3 py-1 rounded-lg text-white"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <span className={`${theme === "dark" ? " text-white" : " text-black"}`}>
                  {note.createdAt
                    ? format(new Date(note.createdAt), "yyyy-MM-dd")
                    : format(new Date(note.updatedAt), "yyyy-MM-dd")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-4">
              No Notes found for this filter.
            </p>
          )}
        </div>
      </div>

      {/* Selected Note Details */}
      {selectedNote && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[84vh] p-6  text-gray-800 flex flex-col gap-6 relative border-l border-primary-foreground"
        >
          <div className="grid gap-y-4 border-b border-primary-foreground pb-12">
            <h1 className={`${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"} text-3xl`}>{selectedNote.title}</h1>
            <div className={`grid grid-cols-[0.2fr_1fr] ${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"}`}>
              <p className="flex items-center gap-x-2">
                <Tag /> Tags
              </p>
              <div className="flex gap-x-4">
                {selectedNote.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded-lg text-white w-fit"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-[0.2fr_1fr] ${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"}`}>
              <p className="flex items-center gap-x-2">
                {" "}
                <Clock /> Last Edited
              </p>
              <p className="flex items-center gap-x-4">
                {selectedNote.createdAt
                  ? selectedNote.createdAt.split("T")[0]
                  : selectedNote.updatedAt.split("T")[0]}
              </p>
            </div>
          </div>

          <p className={`${theme === "dark" ? "bg-primary text-white" : "bg-white text-black"} h-1/2 border border-primary-foreground p-2 rounded-lg`}>
            {selectedNote.content}
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex w-[30%] bg-secondary text-white rounded-lg px-4 py-6 hover:bg-secondary absolute bottom-4 left-4">
                <Edit />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit: {selectedNote.title}</DialogTitle>
              </DialogHeader>
              <div>
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="Title"
                    defaultValue={selectedNote.title}
                    onChange={(e: { target: { value: any } }) =>
                      setNoteData({ ...noteData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Content"
                    defaultValue={selectedNote.content}
                    onChange={(e) =>
                      setNoteData({ ...noteData, content: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <Input
                    placeholder="Tags"
                    defaultValue={selectedNote.tags.join(", ")}
                    onChange={(e: { target: { value: any } }) =>
                      setNoteData({
                        ...noteData,
                        tags: e.target.value.split(","),
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-secondary text-white hover:text-secondary"
                  onClick={() => handleEditNote(selectedNote.id)}
                >
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-x-4 absolute bottom-4 right-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    className="bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {pathname.split("/")[1] === "all-notes" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary">Archive</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <ArchiveRestore /> Archive Note
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to archive this note? You can find
                      it in the Archived Notes section and restore it anytime.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleArchiveNote(selectedNote.id)}
                      className="bg-green-500 text-white hover:bg-green-700"
                    >
                      Archive
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                onClick={() => handleRestoreNote(selectedNote.id)}
                className="bg-secondary text-white hover:bg-secondary"
              >
                <RotateCcw />
                Restore
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
