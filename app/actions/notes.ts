"use server";

const PUBLIC_URL = "http://localhost:3001";


type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

export const createNote = async (
  title: string,
  content: string,
  tags: string[]
) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags,
        archived: false,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.statusText}`);
    }

    return await response.json(); // Return the parsed response
  } catch (error) {
    console.error("Error creating note:", error);
    throw error; // Re-throw the error for upstream handling
  }
};

export const getNotes = async () => {
  const response = await fetch(`${PUBLIC_URL}/all-notes?_=${Date.now()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.statusText}`);
  }

  const notes: Note[] = await response.json();

  // Filter out notes with archive === true
  const filteredNotes = notes.filter((note) => note.archived !== true);

  return filteredNotes;
};

export const getNote = async (id: string) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch note: ${response.statusText}`);
    }

    return await response.json(); // Ensure this is the note object
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const getNotesByTag = async (tag: string) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes?tags=${tag}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const archiveNote = async (id: string) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        archived: true,
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to archive note: ${response.statusText}`);
    }
    return await response.json(); // Return the updated note object
  } catch (error) {
    console.error("Error archiving note:", error);
    throw error;
  }
};

export const restoreNote = async (id: string) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        archived: false,
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to restore note: ${response.statusText}`);
    }
    return await response.json(); // Return the updated note object
  } catch (error) {
    console.error("Error restoring note:", error);
    throw error;
  }
};


export const getArchivedNotes = async () => {
  const response = await fetch(`${PUBLIC_URL}/all-notes?_=${Date.now()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch archived notes: ${response.statusText}`);
  }

  const notes: Note[] = await response.json();

  // Filter out notes with archive === true
  const filteredNotes = notes.filter((note) => note.archived === true);

  return filteredNotes;
};


export const updateNote = async (
  id: string,
  title: string,
  content: string,
  tags: string[]
) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.statusText}`);
    }

    return await response.json(); // Return the updated note object
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};


export const deleteNote = async (id: string) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/all-notes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }

    return { success: true }; // Return success confirmation
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

