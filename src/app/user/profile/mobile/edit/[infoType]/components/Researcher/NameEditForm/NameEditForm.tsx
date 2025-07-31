'use client';

import { FormProvider } from 'react-hook-form';

import { useFormResearcherProfileEdit } from '../../../hooks/useFormResearcherProfileEdit';
import EditFormLayout from '../../EditFormLayout/EditFormLayout';
import SaveButton from '../../SaveButton';

import { ResearcherResponse } from '@/apis/login';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import { ResearcherUpdateSchemaType } from '@/schema/profile/ResearcherUpdateSchema';

interface NameEditFormProps {
  userInfo: ResearcherResponse;
}

const NameEditForm = ({ userInfo }: NameEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormResearcherProfileEdit(userInfo);

  return (
    <FormProvider {...form}>
      <EditFormLayout title="연구자 정보를 입력해 주세요">
        <JoinInput<ResearcherUpdateSchemaType>
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
