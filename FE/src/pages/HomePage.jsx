import React from 'react'
import Header from '../components/header'
import StatsAndFilter from '../components/statsandfilter'
import TaskList from '../components/tasklist'
import TaskListPagination from '../components/tasklistpagination'
import AddTask from '../components/addtask'
import DateTime from '../components/datetime'
import Footer from '../components/footer'
import { useState } from 'react'
import { toast } from 'sonner'
import { useEffect } from 'react'
import api from '@/lib/axios'

const HomePage = () => {
    const [tasksBuffer, setTasksBuffer] = useState([]);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasksBuffer(res.data.tasks);
            setActiveTasksCount(res.data.activeCount);
            setCompletedTasksCount(res.data.completedCount);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('An error occurred while fetching tasks. Please try again later.');
        }
    };
    const filteredTasks = tasksBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "completed";
            default:
                return true;
        }
    });

    const handletaskchange = () => {
        fetchTasks();
    }


    return (
        <div className="min-h-screen w-full relative">
            {/* Radial Gradient Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
                }}
            />
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/* <Header /> */}
                    <Header />

                    {/* <AddTask /> */}
                    <AddTask handleAddNewTask={handletaskchange} />

                    {/* <StatsAndFilter /> */}
                    <StatsAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        activeCount={activeTasksCount}
                        completedCount={completedTasksCount}
                    />
                    {/* <TaskList /> */}
                    <TaskList filtertasks={filteredTasks} filter={filter}
                        handleTaskChanged={handletaskchange} />

                    {/* <TaskListPagination /> */}
                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                        <TaskListPagination />
                        <DateTime />
                    </div>

                    {/* <Footer /> */}
                    <Footer
                        activeCount={activeTasksCount}
                        completedCount={completedTasksCount} />

                </div>

            </div>
        </div>
    );
};

export default HomePage