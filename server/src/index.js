import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";


const PORT =  process.env.PORT || 3001
const MONGODBURL = process.env.MONGODBURL 
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
    MONGODBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  app.listen(PORT, () => console.log("Server started on PORT " + PORT));


 
//
 
 
