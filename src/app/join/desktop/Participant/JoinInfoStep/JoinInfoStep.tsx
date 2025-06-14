'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  joinAreaFilterContainer,
  filterTitleWrapper,
  filterTitle,
  requiredStar,
  joinAreaFilterWrapper,
} from './JoinInfoStep.css';
import JoinSelect from './JoinSelect/JoinSelect';
import RadioButtonGroupContainer from './RadioButtonGroupContainer/RadioButtonGroupContainer';
import AreaTooltip from '../../../components/AreaTooltip/AreaTooltip';
import JoinInput from '../../../components/JoinInput/JoinInput';

import { JOIN_REGION, JOIN_SUB_REGION } from '@/app/join/JoinPage.constants';
import { joinContentContainer, joinForm, nextButton } from '@/app/join/JoinPage.css';
import { Gender, MatchType } from '@/app/join/JoinPage.types';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinInfoStepProps {
  handleSubmit: () => void;
}

const JoinInfoStep = ({ handleSubmit }: JoinInfoStepProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ParticipantJoinSchemaType>();

  const selectedArea = useWatch({ name: 'basicAddressInfo.region', control });
  const selectedAdditionalArea = useWatch({ name: 'additionalAddressInfo.region', control });

  const values = useWatch({
    name: ['name', 'gender', 'birthDate', 'basicAddressInfo.area', 'basicAddressInfo.region'],
    control,
  });

  const isAllFilled = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);

  return (
    <section className={joinForm}>
      <div className={joinContentContainer}>
        {/* 이름 */}
        <JoinInput<ParticipantJoinSchemaType>
          name="name"
          control={control}
          label="이름"
          required
          placeholder="이름(실명) 입력"
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
          tip="나중에 수정할 수 없어요"
        />

        {/* 생년월일 */}
        <JoinInput<ParticipantJoinSchemaType>
          name="birthDate"
          control={control}
          label="생년월일"
          required
          placeholder="YYYY.MM.DD"
          tip="나중에 수정할 수 없어요"
          isTip={false}
          inputType="date"
        />

        {/* 거주 지역 */}
        <div className={joinAreaFilterContainer}>
          <div className={filterTitleWrapper}>
            <span className={filterTitle}>거주 지역</span>
            <span className={requiredStar}>*</span>
          </div>
          <div className={joinAreaFilterWrapper}>
            <Controller
              name="basicAddressInfo.region"
              control={control}
              render={({ field, fieldState }) => (
                <JoinSelect
                  value={field.value}
                  onChange={(value) => setValue('basicAddressInfo.region', value)}
                  placeholder="시·도"
                  options={JOIN_REGION}
                  isError={Boolean(fieldState.error) && !field.value}
                />
              )}
            />

            <Controller
              name="basicAddressInfo.area"
              control={control}
              render={({ field, fieldState }) => (
                <JoinSelect
                  value={field.value}
                  onChange={(value) => setValue('basicAddressInfo.area', value)}
                  placeholder="시·군·구"
                  options={JOIN_SUB_REGION[selectedArea] || []}
                  isError={Boolean(fieldState.error) && !field.value}
                />
              )}
            />
          </div>
        </div>

        {/* 추가 활동 지역 */}
        <div className={joinAreaFilterContainer}>
          <div className={filterTitleWrapper}>
            <span className={filterTitle}>추가 활동 지역</span>
            <AreaTooltip />
          </div>
          <div className={joinAreaFilterWrapper}>
            <Controller
              name="additionalAddressInfo.region"
              control={control}
              render={({ field, fieldState }) => (
                <JoinSelect
                  value={field.value}
                  onChange={(value) => setValue('additionalAddressInfo.region', value)}
                  placeholder="시·도"
                  options={JOIN_REGION}
                  isError={Boolean(fieldState.error)}
                />
              )}
            />

            <Controller
              name="additionalAddressInfo.area"
              control={control}
              render={({ field, fieldState }) => (
                <JoinSelect
                  value={field.value}
                  onChange={(value) => setValue('additionalAddressInfo.area', value)}
                  placeholder="시·군·구"
                  options={JOIN_SUB_REGION[selectedAdditionalArea || ''] || []}
                  isError={Boolean(fieldState.error)}
                />
              )}
            />
          </div>
        </div>

        {/* 선호 실험 진행 방식 */}
        <RadioButtonGroupContainer<MatchType>
          control={control}
          name="matchType"
          title="선호 실험 진행 방식"
          options={[
            { value: 'ALL', label: '전체' },
            { value: 'OFFLINE', label: '대면' },
            { value: 'ONLINE', label: '비대면' },
          ]}
          onChange={(value) => setValue('matchType', value)}
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
