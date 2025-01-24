import { useFormContext } from 'react-hook-form';

import AreaTooltip from './AreaTooltip';
import {
  filterTitle,
  filterTitleWrapper,
  joinAreaFilterContainer,
  joinAreaFilterWrapper,
  joinButton,
  joinContentContainer,
  requiredStar,
} from './JoinInfoStep.styles';
import JoinSelect from './JoinSelect/JoinSelect';
import RadioButtonGroupContainer from './RadioButtonGroupContainer/RadioButtonGroupContainer';
import JoinInput from '../../JoinInput/JoinInput';

import { JOIN_REGION, JOIN_SUB_REGION } from '@/app/join/JoinPage.constants';
import { joinForm } from '@/app/join/JoinPage.styles';
import { Gender, MatchType, ParticipantJoinParams } from '@/app/join/JoinPage.types';

interface JoinInfoStepProps {
  onNext: () => void;
}

const JoinInfoStep = ({ onNext }: JoinInfoStepProps) => {
  const { control, watch, setValue } = useFormContext<ParticipantJoinParams>();

  const selectedArea = watch('basicAddressInfo.region');
  const selectedSubArea = watch('basicAddressInfo.area');
  const selectedAdditionalArea = watch('additionalAddressInfo.region');
  const selectedAdditionalSubArea = watch('additionalAddressInfo.area');

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

        <RadioButtonGroupContainer<Gender>
          title="성별"
          options={[
            { label: '남성', value: 'MALE' },
            { label: '여성', value: 'FEMALE' },
            { label: '선택 안 함', value: 'ALL' },
          ]}
          selectedValue={watch('gender')}
          onChange={(value) => setValue('gender', value)}
          required
        />

        <JoinInput
          name="birthDate"
          control={control}
          label="생년월일"
          required
          placeholder="YYYY.MM.DD"
          maxLength={10}
          tip="나중에 수정할 수 없어요"
          rules={{
            validate: (value: string) => {
              if (!/^\d*$/.test(value.replace(/\./g, ''))) {
                return '숫자만 입력 가능합니다.';
              }

              const regex = /^\d{4}\.\d{2}\.\d{2}$/;
              if (!regex.test(value)) {
                return 'YYYY.MM.DD 형식으로 입력해주세요.';
              }

              const year = Number(value.slice(0, 4));
              const month = Number(value.slice(5, 7));
              const day = Number(value.slice(8, 10));

              const date = new Date(year, month - 1, day);

              if (
                date.getFullYear() !== year ||
                date.getMonth() + 1 !== month ||
                date.getDate() !== day
              ) {
                return '유효한 날짜를 입력해주세요.';
              }

              return true;
            },
          }}
        />
        <div css={joinAreaFilterContainer}>
          <div css={filterTitleWrapper}>
            <span css={filterTitle}>거주 지역</span>
            <span css={requiredStar}>*</span>
          </div>
          <div css={joinAreaFilterWrapper}>
            <JoinSelect
              value={selectedArea}
              onChange={(value) => setValue('basicAddressInfo.region', value)}
              placeholder="시·도"
              options={JOIN_REGION}
            />
            <JoinSelect
              value={selectedSubArea}
              onChange={(value) => setValue('basicAddressInfo.area', value)}
              placeholder="시·군·구"
              options={JOIN_SUB_REGION[selectedArea] || []}
            />
          </div>
        </div>
        <div css={joinAreaFilterContainer}>
          <div css={filterTitleWrapper}>
            <span css={filterTitle}>추가 활동 지역</span>
            <AreaTooltip />
          </div>
          <div css={joinAreaFilterWrapper}>
            <JoinSelect
              value={selectedAdditionalArea}
              onChange={(value) => setValue('additionalAddressInfo.region', value)}
              placeholder="시·도"
              options={JOIN_REGION}
            />
            <JoinSelect
              value={selectedAdditionalSubArea}
              onChange={(value) => setValue('additionalAddressInfo.area', value)}
              placeholder="시·군·구"
              options={JOIN_SUB_REGION[selectedAdditionalArea] || []}
            />
          </div>
        </div>
        <RadioButtonGroupContainer<MatchType>
          title="선호 실험 진행 방식"
          options={[
            { value: 'ALL', label: '전체' },
            { value: 'OFFLINE', label: '대면' },
            { value: 'ONLINE', label: '비대면' },
          ]}
          selectedValue={watch('matchType')}
          onChange={(value) => setValue('matchType', value)}
        />
      </div>

      <button css={joinButton} onClick={onNext}>
        회원가입
      </button>
    </section>
  );
};

export default JoinInfoStep;
