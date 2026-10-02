interface UserRoleTabsProps {
    selectedRole: string;
    onSelectRole: (role: string) => void;
    counts: {
        all: number;
        student: number;
        instructor: number;
        administrator: number;
        developer: number;
    };
}

export default function UserRoleTabs({
    selectedRole,
    onSelectRole,
    counts,
}: UserRoleTabsProps) {
    const tabs = [
        { key: 'all', label: 'Semua', count: counts.all },
        { key: 'student', label: 'Member / Siswa', count: counts.student },
        { key: 'instructor', label: 'Instruktur & Pengajar', count: counts.instructor },
        { key: 'administrator', label: 'Administrator', count: counts.administrator },
        { key: 'developer', label: 'Developer', count: counts.developer },
    ];

    return (
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-surface-container bg-surface-container-lowest overflow-x-auto">
            {tabs.map((tab) => {
                const isActive = selectedRole === tab.key;
                return (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => onSelectRole(tab.key)}
                        className={`role-tab relative py-3 px-3 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                            isActive
                                ? 'text-primary'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span>{tab.label}</span>
                        <span
                            className={`px-2 py-0.5 rounded-full text-[11px] ${
                                isActive
                                    ? 'bg-secondary-container/40 text-on-secondary-container'
                                    : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                        >
                            {tab.count}
                        </span>
                        {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
