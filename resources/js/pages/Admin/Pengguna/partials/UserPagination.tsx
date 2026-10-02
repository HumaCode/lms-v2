interface UserPaginationProps {
    from: number;
    to: number;
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
}

export default function UserPagination({
    from,
    to,
    total,
    currentPage,
    lastPage,
    perPage,
    onPageChange,
    onPerPageChange,
}: UserPaginationProps) {
    const delta = 1;
    const pages: (number | string)[] = [];

    for (let i = 1; i <= lastPage; i++) {
        if (
            i === 1 ||
            i === lastPage ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pages.push(i);
        } else if (
            (i === currentPage - delta - 1 && i > 1) ||
            (i === currentPage + delta + 1 && i < lastPage)
        ) {
            pages.push('...');
        }
    }

    const cleanPages: (number | string)[] = [];
    pages.forEach((p) => {
        if (p === '...' && cleanPages[cleanPages.length - 1] === '...') return;
        cleanPages.push(p);
    });

    return (
        <div className="p-4 sm:p-5 bg-surface-container-lowest border-t border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
                <span className="text-on-surface-variant">
                    Menampilkan <strong className="text-on-surface">{from || 0}</strong> -{' '}
                    <strong className="text-on-surface">{to || 0}</strong> dari{' '}
                    <strong className="text-on-surface">{total}</strong> pengguna
                </span>

                <div className="flex items-center gap-1.5 text-outline">
                    <span>Per halaman:</span>
                    <select
                        value={perPage}
                        onChange={(e) => onPerPageChange(Number(e.target.value))}
                        className="bg-surface border border-surface-container-high rounded px-2 py-0.5 text-on-surface focus:outline-none cursor-pointer"
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

            {/* Windowed pagination: < 1 2 3 ... 99 100 > */}
            {lastPage > 1 && (
                <div className="flex items-center gap-1">
                    {/* Previous Button */}
                    <button
                        type="button"
                        disabled={currentPage <= 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="h-8 px-2.5 rounded-lg bg-surface border border-surface-container-high text-outline disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors flex items-center gap-1 text-xs cursor-pointer"
                        title="Sebelumnya"
                    >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        <span className="hidden sm:inline">Sebelumnya</span>
                    </button>

                    {/* Number & Ellipsis Buttons */}
                    {cleanPages.map((p, idx) => {
                        if (p === '...') {
                            return (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="w-8 h-8 flex items-center justify-center text-outline select-none text-xs"
                                >
                                    ...
                                </span>
                            );
                        }

                        const pageNum = Number(p);
                        const isActive = pageNum === currentPage;

                        return (
                            <button
                                key={`page-${pageNum}`}
                                type="button"
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                                    isActive
                                        ? 'bg-primary text-on-primary shadow-xs'
                                        : 'text-on-surface hover:bg-surface-container border border-transparent'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {/* Next Button */}
                    <button
                        type="button"
                        disabled={currentPage >= lastPage}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="h-8 px-2.5 rounded-lg bg-surface border border-surface-container-high text-outline disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors flex items-center gap-1 text-xs cursor-pointer"
                        title="Selanjutnya"
                    >
                        <span className="hidden sm:inline">Selanjutnya</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
}
