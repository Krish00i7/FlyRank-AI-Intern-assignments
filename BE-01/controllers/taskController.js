import tasks from "../data/task.js"

//GET /tasks
export const getAllTasks = (req, res) => {
    res.status(200).json(tasks);
};

//GET /tasks/:id
export const getTaskByID = (req,res) => {
    const id = Number(req.params.id);

    const task = tasks.find((element) => element.id === id);

    if(!task){
        return res.status(404).json({
            error: `Task ${id} not found`,
        });
    }

    res.status(200).json(task);
};

//POST /tasks

export const createTask = (req, res) => {
    const {title} = req.body;

    if(!title || title.trim() === ""){
        res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id : tasks.length + 1,
        title,
        done: false,
    }

    tasks.push(newTask);

    res.status(201).json({
        newTask,
        created: true,
    });
}


//PUT /tasks/:id

export const updateTask = (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find((element) => element.id === id);

    if(!task){
        return res.status(404).json({
            error: `Task ${id} not found`,
        });
    }

    const { title, done } = req.body;

    if(title != undefined){
        task.title = title;
    }

    if(done != undefined){
        task.done = done;
    }

    res.status(200).json({
        task,
        updated: true,
    })
}

//DELETE /tasks/:id


export const deleteTask = (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex((task) => task.id === id);

   if (index === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`,
        });
    }

    tasks.splice(index,1);

    res.status(204).send();
}
