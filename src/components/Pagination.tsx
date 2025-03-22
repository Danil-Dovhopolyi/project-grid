import Button from './Button';


const PAGINATION_SETTINGS = {
    PAGES_TO_SHOW: 5,
    SIBLINGS: 2,
    MIN_PAGE_FOR_ELLIPSIS: 2
} as const;


const createRange = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array(length).fill(0).map((_, index) => start + index);
};

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    const getVisiblePageNumbers = () => {
        let startPage = Math.max(0, currentPage - PAGINATION_SETTINGS.SIBLINGS);

        let endPage = Math.min(
            totalPages - 1,
            startPage + (PAGINATION_SETTINGS.PAGES_TO_SHOW - 1)
        );

        const notEnoughPages = endPage - startPage < PAGINATION_SETTINGS.PAGES_TO_SHOW - 1;
        if (notEnoughPages) {
            startPage = Math.max(0, endPage - (PAGINATION_SETTINGS.PAGES_TO_SHOW - 1));
        }

        return createRange(startPage, endPage);
    };

    const pageNumbers = getVisiblePageNumbers();

    const shouldShowStartEllipsis =
        pageNumbers[0] > PAGINATION_SETTINGS.MIN_PAGE_FOR_ELLIPSIS;

    const shouldShowEndEllipsis =
        pageNumbers[pageNumbers.length - 1] < totalPages - PAGINATION_SETTINGS.MIN_PAGE_FOR_ELLIPSIS;

    return (
        <div className="pagination">
            <Button
                variant="pagination"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            {shouldShowStartEllipsis && (
                <>
                    <Button
                        variant="pagination"
                        onClick={() => onPageChange(0)}
                    >
                        1
                    </Button>
                    <span className="pagination-ellipsis">...</span>
                </>
            )}

            {pageNumbers.map((pageNumber) => (
                <Button
                    key={pageNumber}
                    variant="pagination"
                    isActive={currentPage === pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber + 1}
                </Button>
            ))}

            {shouldShowEndEllipsis && (
                <>
                    <span className="pagination-ellipsis">...</span>
                    <Button
                        variant="pagination"
                        onClick={() => onPageChange(totalPages - 1)}
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                variant="pagination"
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;
