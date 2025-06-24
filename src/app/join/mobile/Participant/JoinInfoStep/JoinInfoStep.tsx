import { useFormContext, useWatch } from 'react-hook-form';

import { joinInputContainer } from './JoinInfoStep.css';
import TitleSection from '../../components/TitleSection/TitleSection';
import { bottomButtonLayout, emailInput, mainContentLayout } from '../../page.css';

import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import RadioButtonGroupContainer from '@/app/join/desktop/Participant/JoinInfoStep/RadioButtonGroupContainer/RadioButtonGroupContainer';
import { Gender } from '@/app/join/JoinPage.types';
import Button from '@/components/Button/Button';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinInfoStepProps {
  onNext: () => void;
}

const JoinInfoStep = ({ onNext }: JoinInfoStepProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ParticipantJoinSchemaType>();

  const values = useWatch({
    name: ['name', 'birthDate', 'gender'],
    control,
  });

  const isValid = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);
  const isError = Object.keys(errors).length > 0;

  return (
    <main className={mainContentLayout}>
      <TitleSection
        title="참여자 정보를 입력해주세요"
        description="성별/생년월일은 추후 수정할 수 없으니 신중히 입력해 주세요"
      />

      <div className={joinInputContainer}>
        {/* 이름 */}
        <JoinInput
          className={emailInput}
          control={control}
          label="이름"
          name="name"
          placeholder="이름을 입력해 주세요"
          required
        />

        {/* 생년월일 */}
        <JoinInput
          className={emailInput}
          control={control}
          label="생년월일"
          name="birthDate"
          placeholder="YYYY. MM. DD"
          required
        />

        {/* 성별 */}
        <RadioButtonGroupContainer<Gender>
          control={control}
          title="성별"
          name="gender"
          options={[
            { label: '남성', value: 'MALE' },
            { label: '여성', value: 'FEMALE' },
            { label: '선택 안 함', value: 'ALL' },
          ]}
          onChange={(value) => setValue('gender', value)}
          required
        />
      </div>

      <div className={bottomButtonLayout}>
        <Button
          variant="primary"
          size="small"
          height="56px"
          onClick={onNext}
          disabled={!isValid || isError}
        >
          다음
        </Button>
      </div>
    </main>
  );
};
export default JoinInfoStep;
