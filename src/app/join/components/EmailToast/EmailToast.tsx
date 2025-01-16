import * as Toast from '@radix-ui/react-toast';
import { toastLayout, toastTitle, toastViewport } from './EmailToast.styles';
import theme from '@/styles/theme';
import Icon from '@/components/Icon';

interface EmailToastProps {
  title: string;
  isToastOpen: boolean;
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailToast = ({ title, isToastOpen, setIsToastOpen }: EmailToastProps) => {
  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root
        css={toastLayout}
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
        duration={1500}
      >
        <Toast.Title css={toastTitle}>
          <Icon icon="CheckRound" color={theme.colors.primaryMint} width={24} height={24} />
          <p>{title}</p>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport css={toastViewport} />
    </Toast.Provider>
  );
};

export default EmailToast;
