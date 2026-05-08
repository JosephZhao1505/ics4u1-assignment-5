import type { ReactNode } from 'react';
import { HiX } from 'react-icons/hi';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md md:p-10" onClick={onClose}>
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border border-slate-800 bg-slate-900 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 rounded-full border border-slate-700/50 bg-slate-950/50 p-2.5 text-slate-400 transition-all hover:bg-indigo-600 hover:text-white"
        >
          <HiX className="h-6 w-6" />
        </button>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
