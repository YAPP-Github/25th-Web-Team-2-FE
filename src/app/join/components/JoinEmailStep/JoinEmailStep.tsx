import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { joinContentContainer, nextButton } from './JoinEmailStep.styles';
import useServiceAgreeCheck from '../../hooks/useServiceAgreeCheck';
import { joinForm } from '../../JoinPage.styles';
import { JoinParams } from '../../JoinPage.types';
import JoinCheckboxContainer from './JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../JoinInput/JoinInput';
import UnivAuthInput from './UnivAuthInput/UnivAuthInput';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const { control, trigger } = useFormContext<JoinParams>();
  const { serviceAgreeCheck, handleAllCheck, handleChangeCheck } = useServiceAgreeCheck();

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const allValid =
    isEmailVerified && serviceAgreeCheck.isTermOfService && serviceAgreeCheck.isPrivacy;

  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  const handleNext = async () => {
    const isStepValid = await trigger(['oauthEmail', 'contactEmail']);
    if (isStepValid) {
      onNext();
    }
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
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식이 올바르지 않아요',
            },
          }}
        />
        <JoinInput
          name="contactEmail"
          control={control}
          label="연락 받을 이메일"
          placeholder="이메일 입력"
          required
          rules={{
            required: '연락 받을 이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식이 올바르지 않아요',
            },
          }}
          tip="로그인 아이디와 달라도 괜찮아요"
        />
        <UnivAuthInput handleVerifyEmail={handleVerifyEmail} />
        <JoinCheckboxContainer
          serviceAgreeCheck={serviceAgreeCheck}
          handleAllCheck={handleAllCheck}
          handleChange={handleChangeCheck}
        />
      </div>
      <button css={nextButton} onClick={handleNext} disabled={!allValid}>
        다음
      </button>
    </section>
  );
};

export default JoinEmailStep;
