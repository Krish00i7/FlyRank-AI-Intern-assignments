import express from "express";
import {getAllTasks, getTaskByID, createTask, updateTask, deleteTask} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskByID);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);
export default router;