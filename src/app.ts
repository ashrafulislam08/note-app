import express, { Application, Request, Response } from "express"
import { model, Schema } from "mongoose"
const app: Application = express()

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

app.post("/create-note", async(req: Request, res: Response) => {
    const myNote = new Note({
        title: "Learning Mongoose",
        content: "I am learning mongoose"
    })
    await myNote.save();
    res.status(201).json({
        success: true,
        message: "Successfully created a note",
        note: myNote
    })
})


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

export default app;