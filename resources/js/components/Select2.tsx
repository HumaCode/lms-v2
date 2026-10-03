import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface Select2Option {
    value: string;
    label: string;
    sublabel?: string;
    icon?: string;           // Material Symbols icon name
    iconColor?: string;      // Tailwind text-color class e.g. 'text-primary'
}

interface Select2Props {
    options: Select2Option[];
    value: string | null | undefined;
    onChange: (value: string | null) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    clearable?: boolean;
    disabled?: boolean;
    className?: string;
    /** Show search input inside dropdown */
    searchable?: boolean;
    /** Minimum options count to show search input automatically */
    searchThreshold?: number;
    id?: string;
}

export default function Select2({
    options,
    value,
    onChange,
    placeholder = 'Pilih...',
    searchPlaceholder = 'Cari...',
    clearable = false,
    disabled = false,
    className = '',
    searchable = true,
    searchThreshold = 5,
    id,
}: Select2Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const selectedOption = options.find((o) => o.value === value) ?? null;
    const showSearch = searchable && options.length >= searchThreshold;

    const filtered = query.trim()
        ? options.filter(
              (o) =>
                  o.label.toLowerCase().includes(query.toLowerCase()) ||
                  o.sublabel?.toLowerCase().includes(query.toLowerCase()),
          )
        : options;

    // Close when clicking outside
    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    // Focus search when opening
    useEffect(() => {
        if (open) {
            setQuery('');
            setHighlightedIndex(0);
            if (showSearch) {
                // slight delay so dropdown is rendered before focusing
                setTimeout(() => searchRef.current?.focus(), 50);
            }
        }
    }, [open, showSearch]);

    const handleSelect = useCallback(
        (opt: Select2Option) => {
            onChange(opt.value);
            setOpen(false);
            setQuery('');
        },
        [onChange],
    );

    const handleClear = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onChange(null);
        },
        [onChange],
    );

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setOpen(true);
            }
            return;
        }
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((i) => Math.max(i - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (filtered[highlightedIndex]) {
                    handleSelect(filtered[highlightedIndex]);
                }
                break;
            case 'Escape':
                setOpen(false);
                break;
        }
    };

    // Scroll highlighted item into view
    useEffect(() => {
        if (!open || !listRef.current) return;
        const items = listRef.current.querySelectorAll<HTMLElement>('[data-select2-item]');
        const el = items[highlightedIndex];
        el?.scrollIntoView({ block: 'nearest' });
    }, [highlightedIndex, open]);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onKeyDown={handleKeyDown}
            id={id}
        >
            {/* Trigger Button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={[
                    'w-full flex items-center justify-between gap-2',
                    'px-3 py-2 rounded-xl text-xs font-medium transition-all',
                    'bg-surface-container-low border focus:outline-none',
                    open
                        ? 'border-primary ring-1 ring-primary shadow-xs'
                        : 'border-surface-container-high hover:border-outline/50',
                    disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer text-on-surface',
                    !selectedOption && 'text-outline',
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                {/* Left: Icon + Label */}
                <span className="flex items-center gap-2 min-w-0 text-left truncate">
                    {selectedOption?.icon && (
                        <span
                            className={`material-symbols-outlined text-[16px] shrink-0 ${
                                selectedOption.iconColor || 'text-primary'
                            }`}
                        >
                            {selectedOption.icon}
                        </span>
                    )}
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    {selectedOption?.sublabel && (
                        <span className="text-outline text-[11px] shrink-0 hidden sm:inline">
                            {selectedOption.sublabel}
                        </span>
                    )}
                </span>

                {/* Right: Clear / Chevron */}
                <span className="flex items-center gap-0.5 shrink-0">
                    {clearable && selectedOption && (
                        <span
                            role="button"
                            onClick={handleClear}
                            className="material-symbols-outlined text-[16px] text-outline hover:text-rose-500 transition-colors"
                            title="Hapus pilihan"
                        >
                            close
                        </span>
                    )}
                    <span
                        className={`material-symbols-outlined text-[18px] text-outline transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                        }`}
                    >
                        expand_more
                    </span>
                </span>
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div
                    className={[
                        'absolute z-50 left-0 right-0 mt-1.5',
                        'bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high',
                        'overflow-hidden',
                        // Open upward if near bottom — handled via CSS trick with max-h
                    ].join(' ')}
                    style={{ maxHeight: '260px' }}
                >
                    {/* Search Input */}
                    {showSearch && (
                        <div className="p-2 border-b border-surface-container-high">
                            <div className="flex items-center gap-2 bg-surface-container-low rounded-lg px-3 py-1.5 border border-surface-container-high focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
                                <span className="material-symbols-outlined text-[16px] text-outline shrink-0">
                                    search
                                </span>
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setHighlightedIndex(0);
                                    }}
                                    placeholder={searchPlaceholder}
                                    className="flex-1 bg-transparent text-on-surface text-xs focus:outline-none placeholder:text-outline/60"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        className="material-symbols-outlined text-[14px] text-outline hover:text-on-surface transition-colors cursor-pointer"
                                    >
                                        close
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Options List */}
                    <div ref={listRef} className="overflow-y-auto" style={{ maxHeight: showSearch ? '196px' : '252px' }}>
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 px-4 text-outline text-xs gap-2">
                                <span className="material-symbols-outlined text-[28px] opacity-40">
                                    search_off
                                </span>
                                <span>Tidak ada hasil untuk "{query}"</span>
                            </div>
                        ) : (
                            filtered.map((opt, idx) => {
                                const isSelected = opt.value === value;
                                const isHighlighted = idx === highlightedIndex;
                                return (
                                    <div
                                        key={opt.value}
                                        data-select2-item
                                        role="option"
                                        aria-selected={isSelected}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleSelect(opt)}
                                        onMouseEnter={() => setHighlightedIndex(idx)}
                                        className={[
                                            'flex items-center gap-2.5 px-3 py-2 cursor-pointer transition-colors text-xs',
                                            isSelected
                                                ? 'bg-primary/10 text-primary font-semibold'
                                                : isHighlighted
                                                ? 'bg-surface-container text-on-surface'
                                                : 'text-on-surface hover:bg-surface-container',
                                        ].join(' ')}
                                    >
                                        {opt.icon && (
                                            <span
                                                className={`material-symbols-outlined text-[16px] shrink-0 ${
                                                    isSelected
                                                        ? 'text-primary'
                                                        : opt.iconColor || 'text-outline'
                                                }`}
                                            >
                                                {opt.icon}
                                            </span>
                                        )}
                                        <span className="flex-1 truncate">{opt.label}</span>
                                        {opt.sublabel && (
                                            <span className="text-outline text-[11px] shrink-0 hidden sm:inline">
                                                {opt.sublabel}
                                            </span>
                                        )}
                                        {isSelected && (
                                            <span className="material-symbols-outlined text-[15px] text-primary shrink-0">
                                                check
                                            </span>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
