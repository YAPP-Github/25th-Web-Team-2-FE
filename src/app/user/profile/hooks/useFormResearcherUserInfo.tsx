import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useUpdateResearcherInfoMutation from './useUpdateResearcherInfoMutation';

import { ResearcherResponse } from '@/apis/login';
import {
  ResearcherUpdateSchema,
  ResearcherUpdateSchemaType,
  ResearcherUpdateSubmitSchema,
} from '@/schema/profile/ResearcherUpdateSchema';

interface UseFormResearcherUserInfoProps {
  userInfo: ResearcherResponse;
}

const useFormResearcherUserInfo = ({ userInfo }: UseFormResearcherUserInfoProps) => {
  const { mutate: updateResearcherInfo, isPending, isError } = useUpdateResearcherInfoMutation();

  const { memberInfo, univName, major, labInfo, adConsent } = userInfo;

  const form = useForm<ResearcherUpdateSchemaType>({
    resolver: zodResolver(ResearcherUpdateSchema()),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      contactEmail: memberInfo.contactEmail,
      name: memberInfo.name,
      univName: univName,
      major: major,
      labInfo: labInfo ?? '',
      adConsent: adConsent ?? false,
      verifiedContactEmail: memberInfo.contactEmail,
    },
  });

  const onSubmit = (onSuccess: () => void) => {
    const formData = form.getValues();
    const submitData = ResearcherUpdateSubmitSchema().parse(formData);

    updateResearcherInfo(submitData, {
      onSuccess,
    });
  };

  return {
    form,
    handleSubmit: (onSuccess: () => void) => form.handleSubmit(() => onSubmit(onSuccess)),
    isLoading: isPending,
    isError,
  };
};

export default useFormResearcherUserInfo;
