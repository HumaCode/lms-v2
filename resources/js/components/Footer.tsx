export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.8125rem] text-slate-500 dark:text-slate-400">
                <div>
                    <span>&copy; {new Date().getFullYear()} </span>
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold">WPU Course Console</strong>. All rights reserved.
                </div>
                <div className="flex items-center gap-4 text-[0.75rem]">
                    <span className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                        Status Sistem: Normal
                    </span>
                    <span className="text-slate-400">v2.0.0-beta</span>
                </div>
            </div>
        </footer>
    );
}
