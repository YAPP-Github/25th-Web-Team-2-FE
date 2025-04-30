'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import { joinContentContainer, joinForm, nextButton } from '@/app/join/JoinPage.css';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinInfoStepProps {
  handleSubmit: () => void;
}

const JoinInfoStep = ({ handleSubmit }: JoinInfoStepProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ResearcherJoinSchemaType>();

  const values = useWatch({ name: ['name', 'univName', 'major'], control });
  const isAllFilled = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        <JoinInput<ResearcherJoinSchemaType>
          name="name"
          control={control}
          label="이름"
          required
          placeholder="이름(실명) 입력"
        />
        <JoinInput<ResearcherJoinSchemaType>
          name="univName"
          control={control}
          label="학교명"
          required
          placeholder="학교명 입력"
        />
        <JoinInput<ResearcherJoinSchemaType>
          name="major"
          control={control}
          label="전공명"
          required
          placeholder="전공명 입력"
        />
        <JoinInput<ResearcherJoinSchemaType>
          name="labInfo"
          control={control}
          label="소속 연구실 정보"
          placeholder="연구실 정보 입력"
          type="textarea"
          maxLength={100}
        />
      </div>
      <button
        className={nextButton}
        onClick={handleSubmit}
        disabled={!(isAllFilled && Object.keys(errors).length === 0)}
      >
        회원가입
      </button>
    </section>
  );
};

export default JoinInfoStep;
