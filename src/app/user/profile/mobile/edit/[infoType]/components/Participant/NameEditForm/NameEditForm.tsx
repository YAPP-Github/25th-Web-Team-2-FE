'use client';

import { FormProvider } from 'react-hook-form';

import { useFormParticipantProfileEdit } from '../../../hooks/useFormParticipantProfileEdit';
import EditFormLayout from '../../EditFormLayout/EditFormLayout';
import SaveButton from '../../SaveButton';

import { ParticipantResponse } from '@/apis/login';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';

interface NameEditFormProps {
  userInfo: ParticipantResponse;
}

const NameEditForm = ({ userInfo }: NameEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormParticipantProfileEdit(userInfo);

  return (
    <FormProvider {...form}>
      <EditFormLayout title="참여자 정보를 입력해 주세요">
        <JoinInput<ParticipantUpdateSchemaType>
          name="name"
          control={form.control}
          label="이름"
          required
          placeholder="이름을 입력해주세요"
          type="input"
        />
        <SaveButton onSave={onSubmit} fields={['name']} isLoading={isLoading} />
      </EditFormLayout>
    </FormProvider>
  );
};

export default NameEditForm;
