import express, { Application, Request, Response } from "express"
import { model, Schema } from "mongoose"
const app: Application = express()

app.use(express.json());

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        enum: ['personal', 'work', 'study', 'other'],
        default: 'personal'
    },
    pinned: {
        type: Boolean,
        default: false
    }, 
    tags: {
        label: { type: String, required: true},
        color: {type: String, default: 'gray'}
    }
})

const Note = model("Note", noteSchema)



app.post("/notes/create-note", async(req: Request, res: Response) => {
    const body = req.body;
    const myNote = new Note(body)
    await myNote.save();
    res.status(201).json({
        success: true,
        message: "Successfully created a note",
        note: myNote
    })
})

app.get("/notes", async(req: Request, res: Response) => {
    const notes = await Note.find();

    res.json({
        message: "",
        success: true,
        notes
    })
})


app.get("/notes/noteId", async(req: Request, res: Response) => {
    const id = req.params.noteId;
    const note = await Note.findById(id);

    res.json({
        success: true,
        note
    })
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

export default app;