'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import LeaveHeader from './components/LeaveHeader/LeaveHeader';
import LeaveReasonForm from './components/LeaveReasonForm/LeaveReasonForm';
import useLeaveMutation from './hooks/useLeaveMutation';
import {
  alertTextWrapper,
  button,
  buttonContainer,
  confirmCheckText,
  confirmCheckWrapper,
  footerMessageContainer,
  leaveButton,
  leaveFormLayout,
  leaveMessageContainer,
  leaveReasonContainer,
  listItem,
  listSubText,
} from './LeavePage.css';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import Icon from '@/components/Icon';
import LeaveSchema, { LeaveSchemaType } from '@/schema/profile/LeaveSchema';
import { colors } from '@/styles/colors';

const LeavePage = () => {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { mutate: leave } = useLeaveMutation();

  const [isChecked, setIsChecked] = useState(false);
  const { control, reset, formState, handleSubmit } = useForm<LeaveSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(LeaveSchema()),
    defaultValues: {
      reason: '',
    },
  });

  const onSubmit = (data: LeaveSchemaType) => {
    const formattedData = {
      reasonType: data.reasonType,
      reason: data.reason === '' ? null : data.reason,
    };

    leave(formattedData, {
      onSuccess: () => {
        signOut({ callbackUrl: '/user/success' });
      },
    });
  };

  // form 상태 (control만 있으면 분리 가능)
  const reasonType = useWatch({ name: 'reasonType', control });
  const reason = useWatch({ name: 'reason', control });

  const reasonCondition =
    reasonType !== 'OTHER' || (reasonType === 'OTHER' && reason && reason.trim().length >= 1);
  const isValidLeave = reasonType && reasonCondition && Object.keys(formState.errors).length === 0;

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

      <div className={buttonContainer}>
        <button className={button} onClick={() => router.back()}>
          이전으로
        </button>
        <button
          className={leaveButton}
          disabled={!isValidLeave || !isChecked}
          onClick={handleSubmit(onSubmit)}
        >
          탈퇴하기
        </button>
      </div>
    </section>
  );
};

export default LeavePage;
