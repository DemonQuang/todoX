import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
const tasklistpagination = ({ handleNext, handlePrev, Page, totalPages, handlePageChange }) => {
    const generalPage = () => {
        const page = [];
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                page.push(i);
            }
        } else {
            if (Page <= 2) {
                page.push(1, 2, 3, "...", totalPages);

            } else if (Page >= totalPages - 1) {
                page.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            }
            else {
                page.push(1, "...", Page, "...", totalPages);
            }
        } return page;
    };

    const pageToShow = generalPage();

    return (
        <div className="flex justify-center items-center mt-4">
            <Pagination>
                <PaginationContent>
                    {/*truoc*/}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={Page === 1 ? undefined : handlePrev}
                            className={cn("cursor-pointer",
                                Page === 1 && "pointer-events-none opacity-50"
                            )}
                        />
                    </PaginationItem>

                    {pageToShow.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={Page === page}
                                    onClick={() => {
                                        if (Page !== page) {
                                            handlePageChange(page);
                                        }
                                    }}

                                    className={cn("cursor-pointer", {
                                        "pointer-events-none opacity-50": Page === page
                                    })}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* di toi trang sau */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={Page === totalPages ? undefined : handleNext}
                            className={cn("cursor-pointer",
                                Page === totalPages && "pointer-events-none opacity-50"
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default tasklistpagination