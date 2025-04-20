import { useRouter } from 'next/navigation';

import { button, buttonContainer, leaveButton } from './LeaveButtonContainer.css';

interface LeaveButtonContainerProps {
  isValidLeave: boolean;
  isChecked: boolean;
  handleSubmit: () => void;
}

const LeaveButtonContainer = ({
  isValidLeave,
  isChecked,
  handleSubmit,
}: LeaveButtonContainerProps) => {
  const router = useRouter();

  return (
    <div className={buttonContainer}>
      <button className={button} onClick={() => router.back()}>
        이전으로
      </button>
      <button className={leaveButton} disabled={!isValidLeave || !isChecked} onClick={handleSubmit}>
        탈퇴하기
      </button>
    </div>
  );
};

export default LeaveButtonContainer;
