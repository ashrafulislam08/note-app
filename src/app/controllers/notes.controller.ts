import express, { Request, Response } from 'express';
import { Note } from '../models/notes.model';

export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async(req: Request, res: Response) => {
    const body = req.body;
    const myNote = new Note(body)
    await myNote.save();
    res.status(201).json({
        success: true,
        message: "Successfully created a note",
        note: myNote
    })
})

notesRoutes.get("/", async(req: Request, res: Response) => {
    const notes = await Note.find();

    res.json({
        message: "",
        success: true,
        notes
    })
})


notesRoutes.get("/:noteId", async(req: Request, res: Response) => {
    const id = req.params.noteId;
    const note = await Note.findById(id);

    res.json({
        success: true,
        note
    })
})


notesRoutes.delete("/:noteId", async(req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const deletedDoc = await Note.findByIdAndDelete(noteId);
    res.json({
        message: "Note Successfully deleted",
        success: true,
        note: deletedDoc,
    })
})

notesRoutes.patch("/:noteId", async(req: Request, res: Response) => {
    const noteId: String = String(req.params.noteId);
    const updatedDoc = req.body;
  await Note.findByIdAndUpdate(noteId, updatedDoc, { new: true})
    res.status(200).json({
        success: true,
        message: "Successfully updated note",
        note: updatedDoc
    })
})