'use client';

import { FormProvider } from 'react-hook-form';

import EditFormLayout from './EditFormLayout/EditFormLayout';

import { ParticipantResponse } from '@/apis/login';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import SaveButton from './SaveButton';
import { useFormProfileEdit } from '../hooks/useFormProfileEdit';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';

interface NameEditFormProps {
  userInfo: ParticipantResponse;
}

const NameEditForm = ({ userInfo }: NameEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormProfileEdit(userInfo);

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
