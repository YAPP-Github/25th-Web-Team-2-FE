import Link from 'next/link';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import useCheckValidEmailQuery from '../../hooks/useCheckValidEmailQuery';
import useFormResearcherUserInfo from '../../hooks/useFormResearcherUserInfo';
import {
  leaveButton,
  updateButton,
  updateInfoFormContainer,
  updateInfoForm,
  termContainer,
} from '../ParticipantUserInfo/ParticipantUserInfo.css';

import { ResearcherResponse } from '@/apis/login';
import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import Icon from '@/components/Icon';
import { ResearcherUpdateSchemaType } from '@/schema/profile/ResearcherUpdateSchema';
import ButtonInput from '@/components/ButtonInput/ButtonInput';

const ResearcherUserInfo = ({ userInfo }: { userInfo: ResearcherResponse }) => {
  const { form, contactEmail, handleSubmit, isLoading, isError } = useFormResearcherUserInfo({
    userInfo,
  });

  const isValidUpdate = Object.keys(form.formState.errors).length === 0;

  const {
    refetch,
    isLoading: isLoadingCheck,
    isSuccess,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailQuery(contactEmail);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const handleCheckValidEmail = async () => {
    await refetch();
    setIsValidToastOpen(true);
  };

  return (
    <>
      <div className={updateInfoFormContainer}>
        <section className={updateInfoForm}>
          {/* 연락 받을 이메일 */}
          <ButtonInput<ResearcherUpdateSchemaType>
            control={form.control}
            name="contactEmail"
            onClick={handleCheckValidEmail}
            isLoadingCheck={isLoadingCheck}
            isSuccess={isSuccess}
            isEmailDuplicateError={isEmailDuplicateError}
            setIsValidToastOpen={setIsValidToastOpen}
            tip="주요 안내 사항을 전달받을 이메일을 입력해 주세요. 이메일 ID와 달라도 괜찮아요"
            toast={
              <EmailToast
                title={isEmailDuplicateError ? '중복된 이메일이에요' : '사용 가능한 이메일이에요'}
                isToastOpen={isValidToastOpen}
                setIsToastOpen={setIsValidToastOpen}
                isError={isEmailDuplicateError}
              />
            }
          />

          {/* 이름 */}
          <JoinInput<ResearcherUpdateSchemaType>
            name="name"
            control={form.control}
            label="이름"
            required
            placeholder="이름(실명) 입력"
            tip="본명을 사용하면 참여자에게 신뢰를 줄 수 있어요"
          />

          {/* 소속 학교 */}
          <JoinInput<ResearcherUpdateSchemaType>
            name="univName"
            control={form.control}
            label="소속 학교"
            required
            placeholder="학교명 입력"
          />

          {/* 소속 학과 */}
          <JoinInput<ResearcherUpdateSchemaType>
            name="major"
            control={form.control}
            label="소속 학과"
            required
            placeholder="전공명 입력"
          />

          {/* 소속 연구실 정보 */}
          <JoinInput<ResearcherUpdateSchemaType>
            name="labInfo"
            control={form.control}
            label="소속 연구실 정보"
            placeholder="연구실 정보 입력"
            type="textarea"
          />

          {/* 광고성 정보 이메일/SMS 수신 동의 */}
          <Controller
            name="adConsent"
            control={form.control}
            render={({ field }) => {
              return (
                <div className={termContainer}>
                  <JoinCheckbox
                    label="[선택] 광고성 정보 이메일/SMS 수신 동의"
                    isChecked={field.value}
                    onChange={() => form.setValue('adConsent', !field.value)}
                    emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" />}
                  />
                </div>
              );
            }}
          />
        </section>
        <Link href="/user/leave" className={leaveButton}>
          <span>회원탈퇴</span>
          <Icon icon="Chevron" rotate={-90} />
        </Link>
      </div>

      <button
        className={updateButton}
        onClick={handleSubmit(() => setIsToastOpen(true))}
        disabled={isLoading || !isValidUpdate}
      >
        {isLoading ? '저장중...' : '저장하기'}
      </button>

      <EmailToast
        title={isError ? '저장에 실패했어요. 잠시 후에 다시 시도해 주세요.' : '저장되었어요'}
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
        isError={isError}
      />
    </>
  );
};

export default ResearcherUserInfo;
