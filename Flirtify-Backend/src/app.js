const express=require("express");
const app=express();
const connectDB=require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const http=require("http");
const PORT=process.env.PORT || 5000;

//use this middleware to solve CORS error and we use origin for frontend to tell from where request
//  is made and credentails true so that when it send token the browser store in the application
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials:true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter =require("./router/user");
const chatRouter=require("./router/chat");
const { initializeSocket } = require("./utils/socket");


app.use("/",authRouter);
app.use("/" ,profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);

const server=http.createServer(app);

initializeSocket(server);



 //making connection with cluster /database
  connectDB()
  .then(()=>{
    console.log("Succesfuly connect to database");
     server.listen(PORT,()=>{
        console.log("Successfully server start");
    });
  })
  .catch((err)=>{
    console.log("error!!! database cannot connect");
  })
  //by using only require the server will start then database connection made but we want firstly database 
  //connection then server will start 
  
