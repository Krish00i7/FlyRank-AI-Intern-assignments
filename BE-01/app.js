import express from 'express'
import taskRoutes from "./routes/taskRoutes.js"
const app = express();
app.use(express.json());

app.use(taskRoutes);

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

export default app;


