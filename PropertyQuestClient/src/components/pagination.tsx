import { Button } from '@/components/ui/button';

export default function Pagination(props: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  increasePage?: () => void;
  decreasePage?: () => void;
}) {
  const { currentPage, totalPages, increasePage, decreasePage } = props;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    props.onPageChange(page);
  };

  return (
    <div className="flex justify-between items-center min-w-full px-4 pt-5 pb-4 bg-transparent">
      <p>
        <span className="text-[#B0B3B5]">Page</span> {currentPage} of{' '}
        {totalPages}
      </p>
      <div className="flex mr-4">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 text-black hover:bg-gray-100"
          onClick={decreasePage}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <div className="flex">
          {totalPages <= 5 ? (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "default" : "outline"}
                className={`mx-1 ${
                  currentPage === page
                    ? 'bg-[#16a249] text-white border-[#16a249] hover:bg-[#16a249]/90'
                    : 'bg-white text-[#E5E5E5] border-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-black'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))
          ) : (
            <>
              {/* First Page and Ellipsis */}
              {totalPages >= 10 && currentPage > 4 && (
                <>
                  <Button
                    size="sm"
                    variant={currentPage === 1 ? "default" : "outline"}
                    className={`mx-1 ${
                      currentPage === 1
                        ? 'bg-[#16a249] text-white border-[#16a249] hover:bg-[#16a249]/90'
                        : 'bg-white text-[#E5E5E5] border-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-black'
                    }`}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </Button>
                  <p className="mx-1 self-center">
                    ...
                  </p>
                </>
              )}
              {/* Dynamic Range of Pages */}
              {Array.from({ length: 5 }, (_, i) => {
                const page = currentPage <= 4 ? i + 1 : currentPage - 2 + i;
                if (page > totalPages) return null; // Prevent overflow beyond totalPages
                return (
                  <Button
                    key={page}
                    size="sm"
                    variant={currentPage === page ? "default" : "outline"}
                    className={`mx-1 ${
                      currentPage === page
                        ? 'bg-[#16a249] text-white border-[#16a249] hover:bg-[#16a249]/90'
                        : 'bg-white text-[#E5E5E5] border-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-black'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                );
              })}
              {/* Last Page and Ellipsis */}
              {totalPages >= 10 && currentPage < totalPages - 4 && (
                <>
                  <p className="mx-1 self-center">
                    ...
                  </p>
                  <Button
                    size="sm"
                    variant={currentPage === totalPages ? "default" : "outline"}
                    className={`mx-1 ${
                      currentPage === totalPages
                        ? 'bg-[#16a249] text-white border-[#16a249] hover:bg-[#16a249]/90'
                        : 'bg-white text-[#E5E5E5] border-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-black'
                    }`}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-black hover:bg-gray-100"
          onClick={increasePage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}