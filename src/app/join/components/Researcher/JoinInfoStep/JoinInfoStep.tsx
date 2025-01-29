import { useFormContext, useWatch } from 'react-hook-form';

import { joinButton } from './JoinInfoStep.styles';
import { joinContentContainer, joinForm } from '../../../JoinPage.styles';
import JoinInput from '../../JoinInput/JoinInput';

import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinInfoStepProps {
  handleSubmit: () => void;
}

const JoinInfoStep = ({ handleSubmit }: JoinInfoStepProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();
  const values = useWatch({ name: ['name', 'univName', 'major'], control });

  const isAllFilled = values.every((value) => value !== '' && value !== undefined);

  return (
    <section css={joinForm}>
      <div css={joinContentContainer}>
        <JoinInput
          name="name"
          control={control}
          label="이름"
          required
          placeholder="이름(실명) 입력"
        />
        <JoinInput
          name="univName"
          control={control}
          label="학교명"
          required
          placeholder="학교명 입력"
        />
        <JoinInput
          name="major"
          control={control}
          label="전공명"
          required
          placeholder="전공명 입력"
        />
        <JoinInput
          name="labInfo"
          control={control}
          label="소속 연구실 정보"
          placeholder="연구실 정보 입력"
          type="textarea"
        />
      </div>
      <button css={joinButton} onClick={handleSubmit} disabled={!isAllFilled}>
        회원가입
      </button>
    </section>
  );
};

export default JoinInfoStep;
