'use client';

import { useFormContext } from 'react-hook-form';

import JoinButton from '../JoinButton/JoinButton';

import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import { joinContentContainer, joinForm } from '@/app/join/JoinPage.css';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinInfoStepProps {
  handleSubmit: () => void;
}

const JoinInfoStep = ({ handleSubmit }: JoinInfoStepProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        {/* 이름 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="name"
          control={control}
          label="이름"
          required
          placeholder="이름(실명) 입력"
        />

        {/* 학교명 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="univName"
          control={control}
          label="학교명"
          required
          placeholder="학교명 입력"
        />

        {/* 전공명 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="major"
          control={control}
          label="전공명"
          required
          placeholder="전공명 입력"
        />

        {/* 소속 연구실 정보 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="labInfo"
          control={control}
          label="소속 연구실 정보"
          placeholder="연구실 정보 입력"
          type="textarea"
          maxLength={100}
        />
      </div>

      {/* 회원가입 버튼 */}
      <JoinButton onSubmit={handleSubmit} />
    </section>
  );
};

export default JoinInfoStep;
