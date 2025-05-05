import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

// Middle-ware
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json());
app.use(cookieParser());

if(process.env.NOCE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
};

app.use((req, res) => {
    res.send("hello backend")
});

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
})

