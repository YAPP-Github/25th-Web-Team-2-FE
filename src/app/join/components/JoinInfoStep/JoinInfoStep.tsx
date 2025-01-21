import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { joinButton } from './JoinInfoStep.styles';
import {
  contentContainer,
  joinContentContainer,
  joinForm,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from '../../JoinPage.styles';
import { JoinParams } from '../../JoinPage.types';
import JoinInput from '../JoinInput/JoinInput';

import Logo from '@/assets/images/logo.svg';

interface JoinInfoStepProps {
  onNext: () => void;
}

const JoinInfoStep = ({ onNext }: JoinInfoStepProps) => {
  const { control, trigger } = useFormContext<JoinParams>();

  const handleNext = async () => {
    const isStepValid = await trigger(['name', 'univName', 'major']);
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <>
      <Image src={Logo} alt="로고" width={80} height={28} />
      <div css={contentContainer}>
        <div css={titleContainer}>
          <h2 css={joinTitle}>연구자 회원가입</h2>
          <div css={progressBarContainer}>
            <div css={progressBarFill} style={{ width: '100%' }} />
          </div>
        </div>
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
              onBlur={() => trigger('name')}
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
              onBlur={() => trigger('univName')}
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
              onBlur={() => trigger('major')}
            />
            <JoinInput
              name="labInfo"
              control={control}
              label="소속 연구실 정보"
              placeholder="연구실 정보 입력"
              type="textarea"
            />
          </div>
        </section>
      </div>
      <button css={joinButton} onClick={handleNext}>
        회원가입
      </button>
    </>
  );
};

export default JoinInfoStep;
