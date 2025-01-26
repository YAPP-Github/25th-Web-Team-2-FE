import { useFormContext } from 'react-hook-form';

import { nextButton } from './JoinEmailStep.styles';
import JoinCheckboxContainer from '../../JoinEmailStep/JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../JoinInput/JoinInput';

import useServiceAgreeCheck from '@/app/join/hooks/useServiceAgreeCheck';
import { joinContentContainer, joinForm } from '@/app/join/JoinPage.styles';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const role = sessionStorage.getItem('role') || '';
  const { control } = useFormContext<ParticipantJoinSchemaType>();
  const { serviceAgreeCheck, handleAllCheck, handleChangeCheck } = useServiceAgreeCheck(role);

  const allValid = serviceAgreeCheck.isTermOfService && serviceAgreeCheck.isPrivacy;

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
        <JoinCheckboxContainer
          serviceAgreeCheck={serviceAgreeCheck}
          handleAllCheck={handleAllCheck}
          handleChange={handleChangeCheck}
        />
      </div>
      <button css={nextButton} onClick={onNext} disabled={!allValid}>
        다음
      </button>
    </section>
  );
};

export default JoinEmailStep;
