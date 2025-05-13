import { useCallback, useEffect, useState } from 'react';

interface UseLeaveConfirmModalOptions {
  isUserInputDirty: boolean;
}

interface UseLeaveConfirmModalResult {
  isLeaveConfirmModalOpen: boolean;
  handleCancelLeave: VoidFunction;
  handleConfirmLeave: VoidFunction;
  handleBackClick: VoidFunction;
  setIsLeaveConfirmModalOpen: (open: boolean) => void;
}

const useLeaveConfirmModal = ({
  isUserInputDirty,
}: UseLeaveConfirmModalOptions): UseLeaveConfirmModalResult => {
  const [isLeaveConfirmModalOpen, setIsLeaveConfirmModalOpen] = useState(false);

  // 이전으로 버튼 클릭
  const handleBackClick = useCallback(() => {
    if (isUserInputDirty) {
      setIsLeaveConfirmModalOpen(true);
    } else {
      history.back();
    }
  }, [isUserInputDirty]);

  // 나가기
  const handleConfirmLeave = useCallback(() => {
    setIsLeaveConfirmModalOpen(false);
    history.go(-2);
  }, []);

  // 페이지 유지
  const handleCancelLeave = useCallback(() => {
    setIsLeaveConfirmModalOpen(false);
  }, []);

  useEffect(() => {
    if (isUserInputDirty) {
      history.pushState(null, '', location.href);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (!isUserInputDirty) return;

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
