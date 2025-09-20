'use client';

import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import Toasts from '@/components/Toast/Toasts';
import type {
  AddToastParams,
  ToastContextType,
  ToastItem,
  ToastParams,
} from '@/components/Toast/Toasts.types';

export const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(({ type, message, duration = 1500 }: AddToastParams) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, duration, type, isOpen: true }]);
  }, []);

  const open = useCallback(
    (props: ToastParams) => {
      addToast({ type: 'success', ...props });
    },
    [addToast],
  );

  const error = useCallback(
    (props: ToastParams) => {
      addToast({ type: 'error', ...props });
    },
    [addToast],
  );

  const handleOpenChange = useCallback((toastId: number, isOpen: boolean) => {
    if (!isOpen) {
      setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
    }
  }, []);

  const toastDispatch = useMemo(() => ({ open, error }), [open, error]);

  return (
    <ToastContext.Provider value={toastDispatch}>
      {children}
      <Toasts toasts={toasts} handleOpenChange={handleOpenChange} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
