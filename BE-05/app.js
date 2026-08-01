import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';

import taskRoutes from "./routes/taskRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import publicRoutes from "./routes/publicRoutes.js"
import protectedRoutes from "./routes/protectedRoutes.js"

const openapiSpec = JSON.parse(readFileSync(new URL('./openapi.json', import.meta.url)));

const app = express();
app.use(express.json());

app.use(taskRoutes);
app.use('/auth', authRoutes);
app.use('/public', publicRoutes);
app.use('/protected', protectedRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Backend..." });
});

app.get("/userinfo", (req, res) => {
    res.status(200).json({
        name: "Krishnakumar M",
        role: "Backend AI Engineering Intern",
        track: "Backend AI Engineering",
        assignment: "BE-05",
    });
});

export default app;


