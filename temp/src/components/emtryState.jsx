import { Circle } from 'lucide-react'
import React from 'react'
import { Card } from "@/components/ui/card";
const EmtryState = ({ filter }) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md" >
            <div className="space-y-3">
                <Circle className="mx-auto size-12 text-muted-foreground" />
                <div>
                    <h3 className='font-medium text-foreground'>
                        {filter === "active" ? " khong co nhiem vu nao" :
                            filter === "completed" ? "chua co nhiem vu hoan thanh" :
                                "chua co nhiem vu"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {filter === "all" ? "them nhiem vu dau tien vao de bat dau" : `chuyen sang "tat ca" de thay nhiem vu ${filter === "active" ? "da hoan thanh" : "dang lam"}`}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default EmtryState;