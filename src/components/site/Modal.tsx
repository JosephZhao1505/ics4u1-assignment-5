import type { ReactNode } from "react";
import { HiX } from "react-icons/hi";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 p-0 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative mx-4 my-4 flex max-h-[92vh] w-full max-w-[50vw] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleeker, contextual close button */}
        <button
          className="absolute top-4 right-4 z-50 rounded-full border border-slate-700/60 bg-slate-950/60 p-2 text-slate-400 backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-slate-100"
          onClick={onClose}
        >
          <HiX className="h-5 w-5" />
        </button>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
};
