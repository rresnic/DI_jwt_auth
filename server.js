const {db} = require("./config/db.js")
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require("./routes/userRouter.js")
const app = express();

const {PORT} = process.env;
app.listen(PORT || 5000, ()=>
    {
        console.log(`running on ${PORT || 5000}`);
    }
)

app.use(express.json());
// app.use(express.urlencoded({extended:true})) unneeded
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))

app.use("/api/user", userRouter);
async function test(){
    try {
        const response = await db.raw('select version()');
        console.log(response.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}
// test();