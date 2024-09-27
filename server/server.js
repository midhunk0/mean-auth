// @ts-nocheck
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv").config();
// const bodyParser=require("body-parser");

const port=8000;
const app=express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:4200"
    })
)

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    res.json({message: "hello from server"});
});

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("database connected"))
    .catch((error)=>console.log("database not connected", error))

app.use("/", require("./route"));
app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
})