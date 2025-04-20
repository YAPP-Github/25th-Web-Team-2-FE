import { confirmCheckText, confirmCheckWrapper } from './LeaveAgreeCheckContainer.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface LeaveAgreeCheckContainerProps {
  isAgree: boolean;
  toggle: () => void;
}

const LeaveAgreeCheckContainer = ({ isAgree, toggle }: LeaveAgreeCheckContainerProps) => {
  return (
    <div className={confirmCheckWrapper} onClick={toggle}>
      <Icon
        icon="CheckSquareFill"
        width={18}
        height={18}
        cursor="pointer"
        color={isAgree ? colors.primaryMint : colors.icon02}
      />
      <span className={confirmCheckText}>유의사항을 모두 확인하였으며 이에 동의합니다</span>
    </div>
  );
};

export default LeaveAgreeCheckContainer;
