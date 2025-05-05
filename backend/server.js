import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use((req, res) => {
    res.send("hello backend")
});

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
})

