import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useUpdateResearcherInfoMutation from './useUpdateResearcherInfoMutation';

import { ResearcherResponse } from '@/apis/login';
import ResearcherUpdateSchema, {
  ResearcherUpdateSchemaType,
} from '@/schema/profile/ResearcherUpdateSchema';

interface UseFormResearcherUserInfoProps {
  userInfo: ResearcherResponse;
}

const useFormResearcherUserInfo = ({ userInfo }: UseFormResearcherUserInfoProps) => {
  const { mutate: updateResearcherInfo, isPending } = useUpdateResearcherInfoMutation();

  const { memberInfo, univName, major, labInfo } = userInfo;

  const form = useForm<ResearcherUpdateSchemaType>({
    resolver: zodResolver(ResearcherUpdateSchema()),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      contactEmail: memberInfo.contactEmail,
      name: memberInfo.name,
      univName: univName,
      major: major,
      labInfo: labInfo,
    },
  });

  const onSubmit = (onSuccess: () => void) => {
    const formData = form.getValues();

    updateResearcherInfo(formData, {
      onSuccess,
    });
  };

  return {
    form,
    handleSubmit: (onSuccess: () => void) => form.handleSubmit(() => onSubmit(onSuccess)),
    isLoading: isPending,
  };
};

export default useFormResearcherUserInfo;
