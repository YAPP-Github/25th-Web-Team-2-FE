import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseLeaveConfirmModalOptions {
  isUserInputDirty: boolean;
  isHomePath?: boolean;
}

interface UseLeaveConfirmModalReturn {
  isLeaveConfirmModalOpen: boolean;
  handleCancelLeave: VoidFunction;
  handleConfirmLeave: VoidFunction;
  handleBackClick: VoidFunction;
  setIsLeaveConfirmModalOpen: (open: boolean) => void;
}

const useLeaveConfirmModal = ({
  isUserInputDirty,
  isHomePath = false,
}: UseLeaveConfirmModalOptions): UseLeaveConfirmModalReturn => {
  const router = useRouter();
  const [isLeaveConfirmModalOpen, setIsLeaveConfirmModalOpen] = useState(false);

  const navigateHomeOrBack = () => {
    if (isHomePath) {
      router.push('/');
    } else {
      history.back();
    }
  };

  // 이전으로 버튼 클릭
  const handleBackClick = () => {
    if (isUserInputDirty) {
      setIsLeaveConfirmModalOpen(true);
    } else {
      navigateHomeOrBack();
    }
  };

  // 나가기 취소
  const handleCancelLeave = () => {
    setIsLeaveConfirmModalOpen(false);
  };

  // 나가기
  const handleConfirmLeave = () => {
    setIsLeaveConfirmModalOpen(false);
    if (isHomePath) {
      router.push('/');
    } else {
      history.go(-2);
    }
  };

  useEffect(() => {
    if (!isUserInputDirty) {
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
