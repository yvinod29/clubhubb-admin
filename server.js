import express, { application } from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import cloudinary from './config/cloudinaryConfig.js'; 
import ClubModel from "./models/adminModel.js"
import Event from './models/eventModel.js'
 import adminAuthRoute from "./routes/adminAuthRoutes.js"
import eventRoute from './routes/eventRoute.js'
import clubRoute from './routes/clubRoute.js'
import { requireSignIn } from "./middlewares/adminAuthMiddleware.js";



  //configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
//middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded instead of bodyParser
app.use(morgan("dev"));


app.use('/api/v1/admin-auth',adminAuthRoute)
app.use('/api/v1/event',requireSignIn,eventRoute)
app.use('/api/v1/club',requireSignIn, clubRoute)


//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to clubhubb admin page</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,'0.0.0.0', () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});