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
import { visibilityOptions } from '@/lib/data'

const HomePage = () => {
    const [tasksBuffer, setTasksBuffer] = useState([]);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [dateFilter, setDateFilter] = useState("today");
    useEffect(() => {
        fetchTasks();
    }, [dateFilter]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateFilter]);

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateFilter}`);
            setTasksBuffer(res.data.tasks);
            setActiveTasksCount(res.data.activeCount);
            setCompletedTasksCount(res.data.completedCount);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Lỗi khi tải dữ liệu');
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

    const visibleTasks = filteredTasks.slice((page - 1) * visibilityOptions, page * visibilityOptions);
    if (visibleTasks.length === 0 && page > 1) {
        setPage(page - 1);
    }
    const totalPages = Math.ceil(filteredTasks.length / visibilityOptions);

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

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
                    <TaskList filtertasks={visibleTasks} filter={filter}
                        handleTaskChanged={handletaskchange} />

                    {/* <TaskListPagination /> */}
                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            Page={page}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />

                        <DateTime dateFilter={dateFilter} setDateFilter={setDateFilter} />
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