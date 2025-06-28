import * as Toast from '@radix-ui/react-toast';

import { toastLayout, toastTitle, toastViewport } from './Toasts.css';

import Icon from '@/components/Icon';
import { TOAST_CONFIG_MAP } from './Toasts.constants';
import { ToastItem } from './Toasts.types';

interface ToastUIProps {
  toasts: ToastItem[];
  handleOpenChange: (id: number, isOpen: boolean) => void;
}

const Toasts = ({ toasts, handleOpenChange }: ToastUIProps) => {
  return (
    <Toast.Provider swipeDirection="up">
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          className={toastLayout}
          open={toast.isOpen}
          onOpenChange={(isOpen) => handleOpenChange(toast.id, isOpen)}
          duration={toast.duration}
        >
          <Toast.Title className={toastTitle}>
            <Icon
              icon={TOAST_CONFIG_MAP[toast.type].icon}
              color={TOAST_CONFIG_MAP[toast.type].color}
              subcolor={TOAST_CONFIG_MAP[toast.type].subcolor}
            />
            <span>{toast.message}</span>
          </Toast.Title>
        </Toast.Root>
      ))}
      <Toast.Viewport className={toastViewport} />
    </Toast.Provider>
  );
};

export default Toasts;
