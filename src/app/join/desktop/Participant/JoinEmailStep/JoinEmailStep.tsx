'use client';

import { useFormContext } from 'react-hook-form';

import NextButton from './NextButton/NextButton';
import JoinCheckboxContainer from '../../../components/JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from '../../../components/JoinInput/JoinInput';

import { joinContentContainer, joinForm } from '@/app/join/JoinPage.css';
import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinEmailStepProps {
  onNext: () => void;
}

const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const { control, getValues } = useFormContext<ParticipantJoinSchemaType>();

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        {/* 소셜 이메일 */}
        <JoinInput<ParticipantJoinSchemaType>
          name="oauthEmail"
          control={control}
          label="소셜 로그인 아이디"
          value={getValues('oauthEmail') || ''}
          placeholder="이메일 입력"
          disabled
        />

        {/* 연락 받을 이메일 */}
        <ContactEmailInput<ParticipantJoinSchemaType>
          title="연락 받을 이메일"
          required
          contactEmailField="contactEmail"
          verifiedEmailField="verifiedContactEmail"
          helperText="로그인 아이디와 달라도 괜찮아요"
          isTip
        />

        {/* 동의 체크 항목 */}
        <JoinCheckboxContainer />
      </div>

      <NextButton onNext={onNext} />
    </section>
  );
};

export default JoinEmailStep;
