import { useRouter } from 'next/navigation';

import { button, buttonContainer, leaveButton } from './LeaveButtonContainer.css';

interface LeaveButtonContainerProps {
  isValidLeave: boolean;
  isChecked: boolean;
  isLoading: boolean;
  handleSubmit: () => void;
}

const LeaveButtonContainer = ({
  isValidLeave,
  isChecked,
  handleSubmit,
  isLoading,
}: LeaveButtonContainerProps) => {
  const router = useRouter();

  return (
    <div className={buttonContainer}>
      <button className={button} onClick={() => router.back()}>
        이전으로
      </button>
      <button
        className={leaveButton}
        disabled={!isValidLeave || !isChecked || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? '처리중...' : '탈퇴하기'}
      </button>
    </div>
  );
};

export default LeaveButtonContainer;
