'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import {
  alertTextWrapper,
  button,
  buttonContainer,
  checkFormContainer,
  checkFormItem,
  confirmCheckWrapper,
  description,
  footerMessageContainer,
  leaveButton,
  leaveFormLayout,
  leaveHeaderWrapper,
  leaveMessageContainer,
  leaveReasonContainer,
  listItem,
  listSubText,
  title,
} from './LeavePage.css';

import { leaveUser } from '@/apis/user';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import Icon from '@/components/Icon';
import LeaveSchema, { LeaveSchemaType } from '@/schema/profile/LeaveSchema';
import { colors } from '@/styles/colors';

const useLeaveMutation = () => {
  return useMutation({
    mutationFn: leaveUser,
  });
};

const REASONS = [
  { label: '연구 활동 또는 실험 참여를 중단했어요', value: 'RESEARCH_STOPPED' },
  { label: '보안이 걱정돼요', value: 'SECURITY_CONCERN' },
  { label: '필요한 기능이 없어요', value: 'NO_NECESSARY_FUNCTION' },
  { label: '메일이 너무 자주 와요', value: 'TOO_MANY_EMAILS' },
  { label: '사이트를 이용하기 불편해요', value: 'INCONVENIENT_SITE' },
  { label: '기타 (직접 입력)', value: 'OTHER' },
];

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
      reason: null,
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

  const reasonType = useWatch({ name: 'reasonType', control });
  const isValidLeave = reasonType && Object.keys(formState.errors).length === 0;

  return (
    <section className={leaveFormLayout}>
      <div className={leaveReasonContainer}>
        <div className={leaveHeaderWrapper}>
          <h2 className={title}>{userInfo?.memberInfo.name}님, 정말 탈퇴하시겠어요?</h2>
          <span className={description}>
            탈퇴를 결정한 이유를 말씀해 주세요. 서비스 개선에 중요한 자료로 활용할게요
          </span>
        </div>
        <div className={checkFormContainer}>
          <Controller
            name="reasonType"
            control={control}
            render={({ field }) => (
              <>
                {REASONS.map((reason) => {
                  return (
                    <label key={reason.value} className={checkFormItem}>
                      <input
                        {...field}
                        name="leave-reason"
                        type="radio"
                        value={reason.value}
                        onChange={(e) => {
                          field.onChange(reason.value);

                          if (field.value === 'OTHER' && e.target.value !== field.value) {
                            reset({ reason: null });
                          }
                        }}
                      />
                      <span>{reason.label}</span>
                    </label>
                  );
                })}
                {field.value === 'OTHER' && (
                  <JoinInput<LeaveSchemaType>
                    name="reason"
                    control={control}
                    placeholder="사유를 입력해주세요"
                    type="textarea"
                    isCount
                    count={300}
                  />
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className={footerMessageContainer}>
        <div className={alertTextWrapper}>
          <Icon icon="AlertOutlined" width={20} height={20} />
          <span>그라밋 탈퇴 전 확인해 주세요</span>
        </div>

        <div className={leaveMessageContainer}>
          <li className={listItem}>
            회원가입 시 입력한 정보가 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다
          </li>
          <span className={listSubText}>
            *부적합 정보, 이용 제한 및 징계에 관한 기록은 일정 기간 보관합니다
          </span>
          <li className={listItem}>
            회원 탈퇴 시 작성하신 게시물 등은 삭제되지 않으므로 탈퇴 전 삭제해 주세요
          </li>
          <li className={listItem}>
            메일 발송에서 수신까지의 시간차로 인해 회원탈퇴 이후 약 하루동안 그라밋 메일을 수신할 수
            있습니다
          </li>
          <li className={listItem}>같은 소셜 아이디로 재가입 시 신규 회원으로 가입됩니다</li>
        </div>

        <div className={confirmCheckWrapper}>
          <Icon
            icon="CheckSquareFill"
            width={18}
            height={18}
            cursor="pointer"
            onClick={() => setIsChecked(!isChecked)}
            color={isChecked ? colors.primaryMint : colors.icon03}
          />
          <span>유의사항을 모두 확인하였으며 이에 동의합니다</span>
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
