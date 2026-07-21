import db from "../config/database.js";

//GET /tasks
export const getAllTasks = async (req, res) => {

    const tasks = await db.all(
        "SELECT * FROM tasks"
    );

    tasks.forEach(task => {
        task.done = Boolean(task.done);
    });

    res.status(200).json(tasks);
};

//GET /tasks/:id
export const getTaskByID = async (req,res) => {
    const id = Number(req.params.id);

    const task = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    if(!task){
        return res.status(404).json({
            error: `Task ${id} not found`,
        });
    }
    task.done = Boolean(task.done);

    res.status(200).json(task);
};

//POST /tasks

export const createTask = async (req, res) => {
    const {title} = req.body;

    if(!title || title.trim() === ""){
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const result = await db.run(
        "INSERT INTO tasks(title,done) VALUES (?, ?)",
        [title, 0]
    );

    const newTask = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [result.lastID]
    );

    newTask.done = Boolean(newTask.done);

    res.status(201).json({
        newTask,
        created: true,
    });
}


//PUT /tasks/:id

export const updateTask = async (req, res) => {
    const id = Number(req.params.id);

    const task = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    if(!task){
        return res.status(404).json({
            error: `Task ${id} not found`,
        });
    }

    const { title, done } = req.body;
    
    await db.run(
        `
        UPDATE tasks 
        SET title = COALESCE(?, title),
            done  = COALESCE(?, done)
        WHERE id = ?
        `,
        [
            title,
            done !== undefined ? Number(done) : null,
            id
        ]
     );

    const updatedTask = await db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    updatedTask.done = Boolean(updatedTask.done);

    res.status(200).json({
        task: updatedTask,
        updated: true,
    });
}

//DELETE /tasks/:id


export const deleteTask = async (req, res) => {
    const id = Number(req.params.id);

    const result = await db.run(
    "DELETE FROM tasks WHERE id = ?",
    [id]
    );

    if(result.changes === 0){
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.status(204).send();
}
