import Task from "../models/task.js";

const getAllTasks = async (req, res) => {
    const { filter = 'today' } = req.query;
    const now = new Date();

    let startDate = null;
    let endDate = null;

    switch (filter) {
        case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            break;

        case "thisWeek":
            const day = now.getDay() || 7; // CN = 7
            const monday = now.getDate() - day + 1;

            startDate = new Date(now.getFullYear(), now.getMonth(), monday);
            endDate = new Date(now.getFullYear(), now.getMonth(), monday + 7);
            break;

        case "thisMonth":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            break;

        case "all":
        default:
            startDate = null;
            endDate = null;
    }

    // ✅ Query chuẩn
    let query = {};
    if (startDate && endDate) {
        query.createdAt = {
            $gte: startDate,
            $lt: endDate
        };
    }

    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [
                        { $match: { status: "active" } },
                        { $count: "count" }
                    ],
                    completedCount: [
                        { $match: { status: "completed" } },
                        { $count: "count" }
                    ]
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completedCount = result[0].completedCount[0]?.count || 0;

        res.json({ tasks, activeCount, completedCount });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newtask = await task.save();
        res.status(201).json(newtask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).json({ message: 'Bad request' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt, } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, status, completedAt },
            { returnDocument: 'after' }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).json({ message: 'Bad request' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllTasks, createTask, updateTask, deleteTask };