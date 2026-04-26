import { filterOptions } from '@/lib/data'
import { Filter, Type } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
const StatsAndFilter = ({ completedCount = 0, activeCount = 0, filter = "all", setFilter }) => {
    return (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* Stats */}
            <div className="flex gap-4">
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-accent-foreground border-info/20"
                >
                    {activeCount} {filterOptions.find((opt) => opt.value === 'active')?.label}
                </Badge>

                <Badge
                    variant="secondary"
                    className="bg-white/50 text-accent-foreground border-info/20"
                >
                    {completedCount} {filterOptions.find((opt) => opt.value === 'completed')?.label}
                </Badge>

            </div>
            {/* Filter */}
            <div className="flex flex-col gap-2 sm:flex-row">
                {filterOptions.map((item) => (
                    <Button
                        key={item.value}
                        variant={filter === item.value ? "gradient" : "ghost"}
                        size="sm"
                        className="capitalize"
                        onClick={() => setFilter(item.value)}
                    >
                        <Filter className="size-4" />
                        {item.label}
                    </Button>
                ))}
            </div>

        </div>
    )
}

export default StatsAndFilter 