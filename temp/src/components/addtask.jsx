import React, { useState } from 'react'
import { Input } from "../components/ui/input";
import { Button } from './ui/button';
import { Card } from './ui/card';
import axios from 'axios';
import { toast } from 'sonner';
const AddTask = ({ handleAddNewTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await axios.post('http://localhost:3007/api/tasks', { title: newTaskTitle });
                toast.success(`nhiem vụ "${newTaskTitle}" đã được thêm thành công!`);
                setNewTaskTitle("");
                handleAddNewTask();
            } catch (error) {
                console.error(`Error adding task "${newTaskTitle}":`, error);
                toast.error(`An error occurred while adding the task "${newTaskTitle}". Please try again later.`);
            }
            setNewTaskTitle("");
        } else {
            toast.error("Vui lòng nhập tiêu đề nhiệm vụ trước khi thêm.");
        }
    };

    const handlKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <Card className='p-6 border rounded-xl shadow-lg bg-white'>
            <div className="flex flex-col gap-3 sm:flex-row">

                <Input
                    type="text"
                    placeholder="Cần làm gì hôm nay?"
                    className="h-12 text-base sm:flex-1 border rounded-md px-3"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={handlKeyPress}
                />

                <Button variant="gradient" size="lg" className="h-12 px-6" onClick={handleAddTask} disabled={!newTaskTitle.trim()}  >
                    Thêm
                </Button>

            </div>
        </Card>
    )
}

export default AddTask