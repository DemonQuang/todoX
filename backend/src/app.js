import express from 'express';
import taskRoutes from './route/taskRoute.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;
const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
}



// 🔥 serve frontend
app.use('/api/tasks', taskRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

export default app;