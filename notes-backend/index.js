import express from "express";
import cors from "cors";
import UserRoute from "./route/NotesRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
