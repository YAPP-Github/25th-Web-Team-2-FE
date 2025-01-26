import { useFormContext } from 'react-hook-form';

import { joinButton } from './JoinInfoStep.styles';
import { joinContentContainer, joinForm } from '../../JoinPage.styles';
import JoinInput from '../JoinInput/JoinInput';

import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinInfoStepProps {
  handleSubmit: () => void;
}

// TODO: blur 될 때 trigger + 입력값 초기화 안되도록 개선 필요
const JoinInfoStep = ({ handleSubmit }: JoinInfoStepProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();

  return (
    <section css={joinForm}>
      <div css={joinContentContainer}>
        <JoinInput
          name="name"
          control={control}
          label="이름"
          required
          placeholder="이름(실명) 입력"
          rules={{
            required: '이름을 입력해주세요.',
            minLength: {
              value: 2,
              message: '이름은 최소 2자 이상이어야 합니다.',
            },
            maxLength: {
              value: 10,
              message: '이름은 최대 10자 이하여야 합니다.',
            },
          }}
        />
        <JoinInput
          name="univName"
          control={control}
          label="학교명"
          required
          placeholder="학교명 입력"
          rules={{
            required: '학교명을 입력해주세요.',
            minLength: {
              value: 2,
              message: '학교명은 최소 2자 이상이어야 합니다.',
            },
            maxLength: {
              value: 25,
              message: '학교명은 최대 25자 이하여야 합니다.',
            },
          }}
        />
        <JoinInput
          name="major"
          control={control}
          label="전공명"
          required
          placeholder="전공명 입력"
          rules={{
            required: '전공명을 입력해주세요.',
            minLength: {
              value: 3,
              message: '전공명은 최소 3자 이상이어야 합니다.',
            },
            maxLength: {
              value: 10,
              message: '전공명은 최대 10자 이하여야 합니다.',
            },
          }}
        />
        <JoinInput
          name="labInfo"
          control={control}
          label="소속 연구실 정보"
          placeholder="연구실 정보 입력"
          type="textarea"
        />
      </div>
      <button css={joinButton} onClick={handleSubmit}>
        회원가입
      </button>
    </section>
  );
};

export default JoinInfoStep;
