import express from 'express'
import "dotenv/config"

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Backend..." });
});

app.get("/userinfo", (req, res) => {
    res.status(200).json({
        name: "Krishnakumar M",
        role: "Backend AI Engineering Intern",
        track: "Backend AI Engineering",
        assignment: "BE-01",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



