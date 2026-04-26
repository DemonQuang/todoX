
import React from 'react'
import EmtryState from './emtryState'
import TCard from './card'
const TaskList = ({ filtertasks, filter, handleTaskChange }) => {
    if (!filtertasks || filtertasks.length === 0) {
        return <EmtryState filter={filter} />
    }

    return (
        <div className="space-y-3">
            {filtertasks.map((task, index) => (
                <TCard
                    key={task._id ?? index}
                    task={task}
                    index={index}
                    handleTaskChange={handleTaskChange}
                />
            ))}

        </div>

    )
}


export default TaskList