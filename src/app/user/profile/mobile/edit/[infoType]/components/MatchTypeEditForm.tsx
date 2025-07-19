'use client';

import { FormProvider } from 'react-hook-form';

import EditFormLayout from './EditFormLayout/EditFormLayout';

import { ParticipantResponse } from '@/apis/login';
import { MatchType } from '@/app/join/JoinPage.types';
import RadioButtonGroupContainer from '@/app/join/desktop/Participant/JoinInfoStep/RadioButtonGroupContainer/RadioButtonGroupContainer';
import SaveButton from './SaveButton';
import { useFormProfileEdit } from '../hooks/useFormProfileEdit';
import { MATCH_TYPE_OPTIONS } from '@/app/home/home.constants';

interface MatchTypeEditFormProps {
  userInfo: ParticipantResponse;
}

const MatchTypeEditForm = ({ userInfo }: MatchTypeEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormProfileEdit(userInfo);

  return (
    <FormProvider {...form}>
      <EditFormLayout
        title="실험에 참여할 방식을 골라주세요"
        description={`입력해주신 정보를 바탕으로 참여 가능한\n실험 목록을 메일로 안내드릴게요`}
      >
        <RadioButtonGroupContainer<MatchType>
          control={form.control}
          name="matchType"
          title="선호 실험 진행 방식"
          options={[
            { value: 'ALL', label: '전체' },
            { value: 'OFFLINE', label: '대면' },
            { value: 'ONLINE', label: '비대면' },
          ]}
          onChange={(value) => form.setValue('matchType', value)}
        />
        <SaveButton onSave={onSubmit} fields={['matchType']} isLoading={isLoading} />
      </EditFormLayout>
    </FormProvider>
  );
};

export default MatchTypeEditForm;
