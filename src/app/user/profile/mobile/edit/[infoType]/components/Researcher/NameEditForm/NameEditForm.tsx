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

const DESCRIPTION =
  '실험 공고를 등록할 때 노출될 정보예요\n구체적일수록 참여자가 신청할 확률이 높아져요';

const NameEditForm = ({ userInfo }: NameEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormResearcherProfileEdit(userInfo);

  return (
    <FormProvider {...form}>
      <EditFormLayout title="연구자 정보를 입력해 주세요" description={DESCRIPTION}>
        <JoinInput<ResearcherUpdateSchemaType>
          name="name"
          control={form.control}
          label="이름"
          required
          placeholder="이름을 입력해주세요"
        />
        <SaveButton<ResearcherUpdateSchemaType>
          onSave={onSubmit}
          fields={['name']}
          isLoading={isLoading}
        />
      </EditFormLayout>
    </FormProvider>
  );
};

export default NameEditForm;
