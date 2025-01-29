import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { joinContentContainer, nextButton } from './JoinEmailStep.styles';
import JoinCheckboxContainer from '../../JoinCheckboxContainer/JoinCheckboxContainer';
import UnivAuthInput from './UnivAuthInput/UnivAuthInput';

import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import useServiceAgreeCheck from '@/app/join/hooks/useServiceAgreeCheck';
import { joinForm } from '@/app/join/JoinPage.styles';
import JoinInput from '../../JoinInput/JoinInput';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const { control, trigger } = useFormContext<ResearcherJoinSchemaType>();
  const { serviceAgreeCheck, handleAllCheck, handleChangeCheck } = useServiceAgreeCheck();

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleNextStep = async () => {
    const isValid = await trigger(['oauthEmail', 'contactEmail']);

    if (isValid) {
      onNext();
    }
  };

  const allValid =
    isEmailVerified && serviceAgreeCheck.isTermOfService && serviceAgreeCheck.isPrivacy;

  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  return (
    <section css={joinForm}>
      <div css={joinContentContainer}>
        <JoinInput
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={oauthEmail}
          placeholder="이메일 입력"
          disabled
        />
        <JoinInput
          name="contactEmail"
          control={control}
          label="연락 받을 이메일"
          placeholder="이메일 입력"
          required
          tip="로그인 아이디와 달라도 괜찮아요"
        />
        <UnivAuthInput handleVerifyEmail={handleVerifyEmail} />
        <JoinCheckboxContainer
          serviceAgreeCheck={serviceAgreeCheck}
          handleAllCheck={handleAllCheck}
          handleChange={handleChangeCheck}
        />
      </div>
      <button css={nextButton} onClick={handleNextStep} disabled={!allValid}>
        다음
      </button>
    </section>
  );
};

export default JoinEmailStep;
