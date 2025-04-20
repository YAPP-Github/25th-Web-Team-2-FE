'use client';

import { useState } from 'react';

import LeaveButtonContainer from './components/LeaveButtonContainer/LeaveButtonContainer';
import LeaveHeader from './components/LeaveHeader/LeaveHeader';
import LeaveReasonForm from './components/LeaveReasonForm/LeaveReasonForm';
import useLeaveForm from './hooks/useLeaveForm';
import {
  alertTextWrapper,
  confirmCheckText,
  confirmCheckWrapper,
  footerMessageContainer,
  leaveFormLayout,
  leaveMessageContainer,
  leaveReasonContainer,
  listItem,
  listSubText,
} from './LeavePage.css';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const LeavePage = () => {
  const { userInfo } = useUserInfo();
  const { control, reset, handleSubmit, isValidLeave } = useLeaveForm();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className={leaveFormLayout}>
      <div className={leaveReasonContainer}>
        <LeaveHeader userName={userInfo?.memberInfo.name} />
        <LeaveReasonForm control={control} reset={reset} />
      </div>

      <div className={footerMessageContainer}>
        <div className={alertTextWrapper}>
          <Icon icon="AlertOutlined" width={20} height={20} />
          <span>그라밋 탈퇴 전 확인해 주세요</span>
        </div>

        <ul className={leaveMessageContainer}>
          <li className={listItem}>
            회원가입 시 입력한 정보가 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다
          </li>
          <li className={listSubText}>
            *부적합 정보, 이용 제한 및 징계에 관한 기록은 일정 기간 보관합니다
          </li>
          <li className={listItem}>
            회원 탈퇴 시 작성하신 게시물 등은 삭제되지 않으므로 탈퇴 전 삭제해 주세요
          </li>
          <li className={listItem}>
            메일 발송에서 수신까지의 시간차로 인해 회원탈퇴 이후 약 하루동안 그라밋 메일을 수신할 수
            있습니다
          </li>
          <li className={listItem}>같은 소셜 아이디로 재가입 시 신규 회원으로 가입됩니다</li>
        </ul>

        <div className={confirmCheckWrapper} onClick={() => setIsChecked(!isChecked)}>
          <Icon
            icon="CheckSquareFill"
            width={18}
            height={18}
            cursor="pointer"
            color={isChecked ? colors.primaryMint : colors.icon02}
          />
          <span className={confirmCheckText}>유의사항을 모두 확인하였으며 이에 동의합니다</span>
        </div>
      </div>

      <LeaveButtonContainer
        isValidLeave={isValidLeave}
        isChecked={isChecked}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default LeavePage;
