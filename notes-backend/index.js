import express from "express";
import db from "./config/database.js";
import notesRoutes from "./route/NotesRoute.js";
import cors from "cors";

const app = express(); // Pastikan app dideklarasikan sebelum digunakan

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(notesRoutes);

// Test database connection and start server
(async () => {
    try {
        await db.authenticate();
        await db.sync(); // Memastikan tabel dibuat jika belum ada
        console.log("Database Connected!");

        app.listen(5000, () => {
            console.log(`Server running at http://localhost:${5000}`);
        });
    } catch (error) {
        console.error("Connection error:", error);
    }
})();
