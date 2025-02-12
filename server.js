const {db} = require("./config/db.js")
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require("./routes/userRouter.js")
const path = require("path");
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
    origin: ['http://localhost:3002', 'http://localhost:5173', "https://di-jwt-client-1.onrender.com"]
}))

app.use("/api/user", userRouter);

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "/clients/dist")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./clients/dist", "index.html"));
});
