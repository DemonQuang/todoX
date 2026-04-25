import React from 'react'

const Footer = ({ completedCount = 0, activeCount = 0 }) => {
    return (
        <>
            {completedCount + activeCount > 0 && (
                <div className="text-center ">
                    <p className="text-sm text-muted-foreground">
                        {completedCount > 0 && (
                            <> ban da hoan thanh {completedCount} nhiem vu {activeCount > 0 && `va con ${activeCount} nhiem vu dang lam`} </>
                        )}
                        {completedCount === 0 && activeCount > 0 && (
                            <> ban co {activeCount} nhiem vu dang lam </>

                        )}
                    </p>
                </div>
            )}
        </>
    )
}

export default Footer