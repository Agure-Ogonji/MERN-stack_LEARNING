import app from "./app.js";
import { connectionToDatabase } from "./db/connection.js";
//CONNECTION AND LISTENER
const PORT = process.env.PORT || 5000;
connectionToDatabase().then(()=>{
  app.listen(PORT, ()=>console.log("SERVER OPEN & CONNECTED TO BATABASE"));  
}).catch((err)=>console.log(err));