import { FormProvider } from 'react-hook-form';

import { useFormResearcherProfileEdit } from '../../../hooks/useFormResearcherProfileEdit';
import EditFormLayout from '../../EditFormLayout/EditFormLayout';
import SaveButton from '../../SaveButton';

import { ResearcherResponse } from '@/apis/login';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import { ResearcherUpdateSchemaType } from '@/schema/profile/ResearcherUpdateSchema';

const DESCRIPTION =
  '실험 공고를 등록할 때 노출될 정보예요\n구체적일수록 참여자가 신청할 확률이 높아져요';

interface UnivInfoEditFormProps {
  userInfo: ResearcherResponse;
}

const UnivInfoEditForm = ({ userInfo }: UnivInfoEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormResearcherProfileEdit(userInfo);

  return (
    <FormProvider {...form}>
      <EditFormLayout title="연구자 정보를 입력해 주세요" description={DESCRIPTION}>
        <JoinInput<ResearcherUpdateSchemaType>
          name="univName"
          control={form.control}
          label="소속 학교"
          required
          placeholder="학교명 입력"
          type="input"
        />
        <JoinInput<ResearcherUpdateSchemaType>
          name="major"
          control={form.control}
          label="소속 학과"
          required
          placeholder="전공명 입력"
          type="input"
        />
        <JoinInput<ResearcherUpdateSchemaType>
          name="labInfo"
          control={form.control}
          label="소속 연구실 정보"
          placeholder="연구실 정보 입력"
          type="textarea"
          maxLength={100}
        />
        <SaveButton<ResearcherUpdateSchemaType>
          onSave={onSubmit}
          fields={['univName', 'major', 'labInfo']}
          isLoading={isLoading}
        />
      </EditFormLayout>
    </FormProvider>
  );
};

export default UnivInfoEditForm;
