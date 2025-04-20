'use client';

import { useReducer } from 'react';

import LeaveAgreeCheckContainer from './components/LeaveAgreeCheckContainer/LeaveAgreeCheckContainer';
import LeaveButtonContainer from './components/LeaveButtonContainer/LeaveButtonContainer';
import LeaveHeader from './components/LeaveHeader/LeaveHeader';
import LeaveMessageContainer from './components/LeaveMessageContainer/LeaveMessageContainer';
import LeaveReasonForm from './components/LeaveReasonForm/LeaveReasonForm';
import useLeaveForm from './hooks/useLeaveForm';
import {
  alertTextWrapper,
  footerMessageContainer,
  leaveFormLayout,
  leaveReasonContainer,
} from './LeavePage.css';

import Icon from '@/components/Icon';

const LeavePage = () => {
  const { control, reset, handleSubmit, isValidLeave } = useLeaveForm();
  const [isAgree, toggle] = useReducer((prev) => !prev, false);

  return (
    <section className={leaveFormLayout}>
      <div className={leaveReasonContainer}>
        <LeaveHeader />
        <LeaveReasonForm control={control} reset={reset} />
      </div>

      <div className={footerMessageContainer}>
        <div className={alertTextWrapper}>
          <Icon icon="AlertOutlined" width={20} height={20} />
          <span>그라밋 탈퇴 전 확인해 주세요</span>
        </div>

        <LeaveMessageContainer />
        <LeaveAgreeCheckContainer isAgree={isAgree} toggle={toggle} />
      </div>

      <LeaveButtonContainer
        isValidLeave={isValidLeave}
        isChecked={isAgree}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default LeavePage;
