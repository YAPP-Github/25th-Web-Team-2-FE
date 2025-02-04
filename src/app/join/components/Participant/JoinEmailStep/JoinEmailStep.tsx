'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { nextButton } from './JoinEmailStep.css';
import JoinCheckboxContainer from '../../JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../JoinInput/JoinInput';

import useServiceAgreeCheck from '@/app/join/hooks/useServiceAgreeCheck';
import { joinContentContainer, joinForm } from '@/app/join/JoinPage.css';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<ParticipantJoinSchemaType>();

  const { serviceAgreeCheck, handleAllCheck, handleChangeCheck } = useServiceAgreeCheck();
  const oauthEmail = useWatch({ name: 'oauthEmail', control });
  const contactEmail = useWatch({ name: 'contactEmail', control });

  const allValid =
    contactEmail &&
    !errors.contactEmail &&
    serviceAgreeCheck.isTermOfService &&
    serviceAgreeCheck.isPrivacy;

  const handleNextStep = async () => {
    const isValid = await trigger(['oauthEmail', 'contactEmail']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        <JoinInput<ParticipantJoinSchemaType>
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={oauthEmail}
          placeholder="이메일 입력"
          disabled
        />
        <JoinInput<ParticipantJoinSchemaType>
          name="contactEmail"
          control={control}
          label="연락 받을 이메일"
          placeholder="이메일 입력"
          required
          tip="로그인 아이디와 달라도 괜찮아요"
        />
        <JoinCheckboxContainer
          serviceAgreeCheck={serviceAgreeCheck}
          handleAllCheck={handleAllCheck}
          handleChange={handleChangeCheck}
        />
      </div>
      <button className={nextButton} onClick={handleNextStep} disabled={!allValid}>
        다음
      </button>
    </section>
  );
};

export default JoinEmailStep;
