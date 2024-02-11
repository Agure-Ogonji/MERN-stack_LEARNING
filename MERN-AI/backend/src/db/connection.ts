import { connect, disconnect } from "mongoose";

async function connectionToDatabase(){
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        
        throw new Error("CANNOT CONNECT TO MONGODB");
    }
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        
        throw new Error("CANNOT DISCONNECT FROM MONGODB");
    }
}

export {connectionToDatabase, disconnectFromDatabase};