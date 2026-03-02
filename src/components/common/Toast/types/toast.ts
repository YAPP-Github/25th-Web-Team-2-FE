export type ToastType = 'success' | 'error';

export interface ToastParams {
  message: string;
  duration?: number;
}

export interface AddToastParams extends ToastParams {
  type: ToastType;
}

export interface ToastContextType {
  open: ({ message, duration }: ToastParams) => void;
  error: ({ message, duration }: ToastParams) => void;
}

export interface ToastItem {
  id: number;
  isOpen: boolean;
  message: string;
  duration: number;
  type: ToastType;
}
