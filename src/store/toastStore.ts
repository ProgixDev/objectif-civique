import { create } from "zustand";
import { createId } from "@/lib/id";

export type ToastVariant = "success" | "error" | "info";

export type Toast = {
  id: string;
  variant: ToastVariant;
  message: string;
};

type ToastState = {
  toasts: Toast[];
  show: (variant: ToastVariant, message: string) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (variant, message) => {
    const id = createId("toast");
    set((s) => ({ toasts: [...s.toasts, { id, variant, message }] }));
    setTimeout(() => get().dismiss(id), 3000);
    return id;
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

export const toast = {
  success: (msg: string) => useToastStore.getState().show("success", msg),
  error: (msg: string) => useToastStore.getState().show("error", msg),
  info: (msg: string) => useToastStore.getState().show("info", msg),
};
