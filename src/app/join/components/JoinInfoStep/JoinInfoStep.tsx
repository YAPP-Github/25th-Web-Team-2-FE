import { useForm } from 'react-hook-form';

import { joinButton } from './JoinInfoStep.styles';
import { contentContainer, joinContentContainer } from '../../JoinPage.styles';
import { InfoForm, JoinParams } from '../../JoinPage.types';
import JoinInput from '../JoinInput/JoinInput';

interface JoinInfoStepProps {
  onNext: (data: Partial<JoinParams>) => void;
}

const JoinInfoStep = ({ onNext }: JoinInfoStepProps) => {
  const { getValues, control } = useForm<InfoForm>({
    defaultValues: {
      name: '',
      univName: '',
      major: '',
      labInfo: '',
    },
  });

  const handleClickNext = () => {
    onNext({ ...getValues() });
  };

  return (
    <>
      <div css={contentContainer}>
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
      </div>
      <button css={joinButton} onClick={handleClickNext}>
        회원가입
      </button>
    </>
  );
};

export default JoinInfoStep;
