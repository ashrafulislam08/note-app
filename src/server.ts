import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;
let PORT = 5000

async function main() {
    try{
        await mongoose.connect("mongodb+srv://note_app:mZhdpWULXdlZWtu3@cluster0.fqfy4uw.mongodb.net/note_app?retryWrites=true&w=majority&appName=Cluster0")
        server = app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch(error) {
        console.log(error)
    }
}

main()