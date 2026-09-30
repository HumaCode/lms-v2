import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface LogoutConfirmModalProps {
    show: boolean;
    onClose: () => void;
}

export default function LogoutConfirmModal({
    show,
    onClose,
}: LogoutConfirmModalProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLogout = () => {
        setIsProcessing(true);
        router.post(route('logout'), {}, {
            onFinish: () => {
                setIsProcessing(false);
                onClose();
            },
        });
    };

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClose={() => {
                    if (!isProcessing) onClose();
                }}
            >
                {/* Backdrop Blur */}
                <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" />
                </TransitionChild>

                {/* Dialog Panel */}
                <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 scale-95 translate-y-2"
                    enterTo="opacity-100 scale-100 translate-y-0"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 scale-100 translate-y-0"
                    leaveTo="opacity-0 scale-95 translate-y-2"
                >
                    <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-surface-container transition-all">
                        {/* Header icon & close button */}
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-2xl bg-error-container/40 flex items-center justify-center text-error border border-error/10 shadow-xs">
                                <span className="material-symbols-outlined text-[26px]">
                                    logout
                                </span>
                            </div>

                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={onClose}
                                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Title & Description */}
                        <div className="mt-4">
                            <h3 className="font-heading text-lg font-bold text-on-surface tracking-tight">
                                Konfirmasi Keluar Akun
                            </h3>
                            <p className="mt-1.5 text-[0.875rem] text-on-surface-variant leading-relaxed">
                                Apakah Anda yakin ingin keluar dari sesi console saat ini? Anda perlu login kembali untuk mengakses data dashboard.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={onClose}
                                className="px-4 py-2.5 rounded-xl border border-surface-container text-on-surface text-[0.875rem] font-semibold hover:bg-surface-container-low transition-colors disabled:opacity-50"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center gap-2 min-w-[140px] px-5 py-2.5 rounded-xl bg-error hover:bg-error/90 text-on-error text-[0.875rem] font-semibold shadow-xs transition-all active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Sedang proses...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">
                                            check_circle
                                        </span>
                                        <span>Ya, Logout</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
