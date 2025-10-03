'use client';

import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import MatchConsentConfirmModal from '../../components/MatchConsentConfirmModal/MatchConsentConfirmModal';
import TitleSection from '../../components/TitleSection/TitleSection';
import { bottomButtonLayout, mainContentLayout } from '../../page.css';

import AreaTooltip from '@/app/join/components/AreaTooltip/AreaTooltip';
import {
  filterTitle,
  filterTitleWrapper,
  joinAreaFilterContainer,
  joinAreaFilterWrapper,
  requiredStar,
} from '@/app/join/desktop/Participant/JoinInfoStep/JoinInfoStep.css';
import JoinSelect from '@/app/join/desktop/Participant/JoinInfoStep/JoinSelect/JoinSelect';
import RadioButtonGroupContainer from '@/app/join/desktop/Participant/JoinInfoStep/RadioButtonGroupContainer/RadioButtonGroupContainer';
import { JOIN_REGION, JOIN_SUB_REGION } from '@/app/join/JoinPage.constants';
import { MatchType } from '@/app/join/JoinPage.types';
import Button from '@/components/Button/Button';
import { stopRecording } from '@/lib/mixpanelClient';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface JoinAdditionalInfoStepProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const JoinAdditionalInfoStep = ({ onSubmit }: JoinAdditionalInfoStepProps) => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<ParticipantJoinSchemaType>();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const matchConsent = useWatch({ name: 'matchConsent', control });
  const selectedArea = useWatch({ name: 'basicAddressInfo.region', control });
  const selectedAdditionalArea = useWatch({ name: 'additionalAddressInfo.region', control });

  const values = useWatch({
    name: ['basicAddressInfo.area', 'basicAddressInfo.region'],
    control,
  });

  const isValid = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);
  const isError = Object.keys(errors).length > 0;

  const handleClickJoin = () => {
    stopRecording();
    onSubmit();
  };

  const handleSubmitAfterConsent = () => {
    setValue('matchConsent', true);
    handleClickJoin();
  };

  return (
    <main className={mainContentLayout}>
      <TitleSection
        title="실험에 참여할 지역과 방식을 골라주세요"
        description={`입력해주신 정보를 바탕으로 참여 가능한\n실험 목록을 메일로 안내드릴게요`}
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
                onChange={(value) => {
                  setValue('basicAddressInfo.region', value);
                  setValue('basicAddressInfo.area', '');
                }}
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
                onChange={(value) => {
                  setValue('additionalAddressInfo.region', value);
                  setValue('additionalAddressInfo.area', '');
                }}
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

      <div className={bottomButtonLayout}>
        <Button
          variant="primary"
          size="small"
          onClick={matchConsent ? handleClickJoin : openModal}
          disabled={!isValid || isError || isSubmitting}
        >
          {isSubmitting ? '처리중...' : '회원가입'}
        </Button>
      </div>

      <MatchConsentConfirmModal
        title={`실험 추천 알림에\n동의하지 않으셨네요!`}
        description={`선호 지역과 방식에 맞는 실험만 골라\n메일로 보내드릴게요. 동의하시겠어요?`}
        open={isOpen}
        onOpenChange={setIsOpen}
        onClose={closeModal}
        onSubmit={handleClickJoin}
        onConsent={handleSubmitAfterConsent}
      />
    </main>
  );
};

export default JoinAdditionalInfoStep;
