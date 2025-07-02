import { useContext } from 'react';

import { ToastContext } from '@/providers/ToastProvider';

export const useToast = () => {
  const toastDispatch = useContext(ToastContext);

  if (!toastDispatch) {
    throw new Error('useToast는 ToastProvider 내에서 사용되어야 합니다.');
  }

  return toastDispatch;
};
