'use client';

import * as Toast from '@radix-ui/react-toast';

import { toastLayout, toastTitle, toastViewport } from './EmailToast.css';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

interface EmailToastProps {
  title: string;
  isToastOpen: boolean;
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isError?: boolean;
}

const EmailToast = ({ title, isToastOpen, setIsToastOpen, isError = false }: EmailToastProps) => {
  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root
        className={toastLayout}
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
        duration={1500}
      >
        <Toast.Title className={toastTitle}>
          {isError ? (
            <Icon icon="BangRound" color={theme.colors.textAlert} />
          ) : (
            <Icon icon="CheckRound" color={theme.colors.primaryMint} />
          )}

          <p>{title}</p>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className={toastViewport} />
    </Toast.Provider>
  );
};

export default EmailToast;
