import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

