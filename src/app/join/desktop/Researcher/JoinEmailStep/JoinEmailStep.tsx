'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import NextButton from './NextButton';
import UnivAuthInput from './UnivAuthInput/UnivAuthInput';
import EmailToast from '../../../components/EmailToast/EmailToast';
import JoinCheckboxContainer from '../../../components/JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../../components/JoinInput/JoinInput';

import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import useVerifyUnivEmail from '@/app/join/hooks/useVerifyUnivEmail';
import { joinContentContainer, joinForm } from '@/app/join/JoinPage.css';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const { control, getValues } = useFormContext<ResearcherJoinSchemaType>();
  const { isEmailVerified, handleVerifyEmail, handleResetVerifyEmail } = useVerifyUnivEmail();

  const {
    mutate: checkValidEmail,
    isPending: isLoadingCheck,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoMutation();

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues('contactEmail'), {
      onSettled: () => {
        setIsValidToastOpen(true);
      },
    });
  };

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        {/* 소셜 이메일 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={getValues('oauthEmail')}
          placeholder="이메일 입력"
          disabled
        />

        {/* 연락 받을 이메일 */}
        <ButtonInput<ResearcherJoinSchemaType>
          title="연락 받을 이메일"
          required
          control={control}
          name="contactEmail"
          onClick={handleCheckValidEmail}
          isLoading={isLoadingCheck}
          setIsValidToastOpen={setIsValidToastOpen}
          tip="로그인 아이디와 달라도 괜찮아요"
          toast={
            <EmailToast
              title={isEmailDuplicateError ? '중복된 이메일이에요' : '사용 가능한 이메일이에요'}
              isToastOpen={isValidToastOpen}
              setIsToastOpen={setIsValidToastOpen}
              isError={isEmailDuplicateError}
            />
          }
        />

        {/* 학교 메일 인증 */}
        <UnivAuthInput
          isEmailVerified={isEmailVerified}
          handleVerifyEmail={handleVerifyEmail}
          handleResetVerifyEmail={handleResetVerifyEmail}
        />

        {/* 동의 체크 항목 */}
        <JoinCheckboxContainer />
      </div>
      <NextButton onNext={onNext} isEmailVerified={isEmailVerified} />
    </section>
  );
};

export default JoinEmailStep;
