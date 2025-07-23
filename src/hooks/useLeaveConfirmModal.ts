import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseLeaveConfirmModalOptions {
  isUserInputDirty: boolean;
}

interface UseLeaveConfirmModalReturn {
  isLeaveConfirmModalOpen: boolean;
  setIsLeaveConfirmModalOpen: (open: boolean) => void;
  handleCancelLeave: VoidFunction;
  handleBackClick: (args: { goHome: boolean }) => void;
  handleConfirmLeave: (args: { goHome: boolean }) => void;
}

const useLeaveConfirmModal = ({
  isUserInputDirty,
}: UseLeaveConfirmModalOptions): UseLeaveConfirmModalReturn => {
  const router = useRouter();
  const [isLeaveConfirmModalOpen, setIsLeaveConfirmModalOpen] = useState(false);

  const navigate = (goHome: boolean) => {
    if (goHome) {
      router.push('/');
    } else {
      history.back();
    }
  };

  // 이전으로 버튼 클릭
  const handleBackClick = ({ goHome }: { goHome: boolean }) => {
    if (isUserInputDirty) {
      setIsLeaveConfirmModalOpen(true);
    } else {
      navigate(goHome);
    }
  };

  // 나가기 취소
  const handleCancelLeave = () => {
    setIsLeaveConfirmModalOpen(false);
  };

  // 나가기
  const handleConfirmLeave = ({ goHome }: { goHome: boolean }) => {
    setIsLeaveConfirmModalOpen(false);
    if (goHome) {
      router.push('/');
    } else {
      history.go(-2);
    }
  };

  useEffect(() => {
    if (!isUserInputDirty || typeof window === 'undefined') {
      return;
    }

    history.pushState(null, '', location.href);

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      setIsLeaveConfirmModalOpen(true);
      history.pushState(null, '', location.href);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isUserInputDirty]);

  return {
    isLeaveConfirmModalOpen,
    handleBackClick,
    handleConfirmLeave,
    handleCancelLeave,
    setIsLeaveConfirmModalOpen,
  };
};

export default useLeaveConfirmModal;
