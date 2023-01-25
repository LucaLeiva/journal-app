import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helper/fileUpload";
import { loadNotes } from "../../helper/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
  return async(dispatch, getState) => {

    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FirebaseDB, `user-${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }
}

export const startLoadingNotes = () => {
  return async(dispatch, getState) => {

    const { uid } = getState().auth;

    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  }
}

export const startSaveNote = () => {
  return async(dispatch, getState) => {

    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    const noteToFireStore = { ...activeNote };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `user-${uid}/journal/notes/${activeNote.id}`);

    await setDoc(docRef, noteToFireStore, {merge: true});

    dispatch(updateNote(activeNote));
  }
}

export const startUploadingFiles = (files = []) => {
  return async(dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    
    dispatch(setPhotosToActiveNote(photosUrls));
  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    const docRef = doc(FirebaseDB, `user-${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(activeNote.id));
  }
}