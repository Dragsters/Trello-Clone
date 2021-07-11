import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { api } from "./api/index.js";

dotenv.config();
const app = express();

//connect with process.env.GLOBAL_MONGO_URI
mongoose.connect(process.env.LOCAL_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("database connected"))
	.catch((err) => { console.log(err); process.exit(); });


app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("trello"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("running on the port", PORT));

app.get("/t", (req, res) => {
	res.json({ message: "Welcome to Trello Clone backend server.\n go to api using /api" });
});

app.use('/api', api);
