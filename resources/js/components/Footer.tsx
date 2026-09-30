export default function Footer() {
    return (
        <footer className="mt-auto border-t border-surface-container bg-surface-container-lowest px-5 sm:px-6 lg:px-8 py-4">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.8125rem] text-on-surface-variant">
                <div>
                    <span>&copy; {new Date().getFullYear()} </span>
                    <strong className="text-on-surface font-semibold">WPU Course Console</strong>. All rights reserved.
                </div>
                <div className="flex items-center gap-4 text-[0.75rem]">
                    <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                        Status Sistem: Normal
                    </span>
                    <span className="text-outline">v2.0.0-beta</span>
                </div>
            </div>
        </footer>
    );
}
