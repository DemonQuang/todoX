import React, { useState } from 'react'
import { Button } from './ui/button';
import { CheckCircle2, Circle, SquarePen } from 'lucide-react';
import { Input } from '@base-ui/react';
import { cn } from "@/lib/utils"
import { Calendar, Trash2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import api from '@/lib/axios';
const TCard = ({ task, index, handleTaskChange }) => {
    if (!task) return null;

    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title || "");
    const updateTask = async () => {
        try {
            await api.put(`/tasks/${task._id}`, { title: updatedTitle });
            toast.success("Task updated successfully!");
            setIsEditing(false);
            handleTaskChange();
        } catch (error) {
            console.error(`Error updating task with ID ${task._id}:`, error);
            toast.error("Failed to update task.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateTask();
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("Task deleted successfully!");
            handleTaskChange();
        } catch (error) {
            console.error(`Error deleting task with ID ${taskId}:`, error);
            toast.error("Failed to delete task.");
        }
    }

    const toggleTaskStatus = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`, {
                    status: "completed",
                    completedAt: new Date()
                });
                toast.success("Task marked as completed!");
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: "active",
                    completedAt: null
                });
                toast.success("Task marked as active!");
            }
            handleTaskChange();
        } catch (error) {
            console.error(`Error updating task status with ID ${task._id}:`, error);
            toast.error("Failed to update task status.");
        }
    };



    return (
        <Card className={cn(
            "p-4 border-0 bg-gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "completed" && "opacity-75",
        )}
            style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full duration-200",
                        task.status === "completed"
                            ? `text-success hover:text-success/80 `
                            : `text-muted-foreground hover:text-primary`
                    )}
                    onClick={toggleTaskStatus}>
                    {task.status === "completed" ? (
                        <CheckCircle2 className='size-5 ' />
                    ) : (
                        <Circle className='size-5 ' />
                    )}
                </Button>
                {/* Task Title */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            placeholder="can phai lam gi"
                            className="w-full h-12 text-base border-boder/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={() => {
                                setIsEditing(false)
                                setUpdatedTitle(task.title || "")
                            }}
                        />
                    ) : (
                        <p className={cn("text-base transition-all duration-200",
                            task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground")}>
                            {task.title}
                        </p>
                    )}
                    {/* ngay tao va ngay hoan thanh */}
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>

                        {task.completedAt && (
                            <>
                                <span>-</span>
                                <Calendar className="size-4" />
                                <span>
                                    {new Date(task.completedAt).toLocaleDateString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>



                {/* Edit and Delete Buttons */}
                <div className="hidden gap-2 group-hover:flex animate-slide-up">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditing(true);
                            setUpdatedTitle(task.title || "");
                        }}
                    >
                        <SquarePen className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon"
                        className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>

            </div>
        </Card>
    )
}

export default TCard