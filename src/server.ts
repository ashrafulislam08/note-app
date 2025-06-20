import mongoose from "mongoose";
import 'dotenv/config'
import { Server } from "http";
import app from "./app";

let server: Server;
let PORT = 5000

async function main() {
    try{
        server = app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch(error) {
        console.log(error)
    }
}

main()