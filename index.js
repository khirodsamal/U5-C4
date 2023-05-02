const express=require("express")
const app=express()
app.use(express.json())
const {connect}=require("./db/db")
const {userRouter}=require("./router/user.router")
app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/",userRouter)


app.listen(9000,async()=>{
    try {
        await connect
        console.log("connect  to db")
    } catch (error) {
        
    }
    console.log("server is ronning at 9000")
})