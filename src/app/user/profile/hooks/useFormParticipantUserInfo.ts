import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import useUpdateParticipantInfoMutation from './useUpdateParticipantInfoMutation';

import { ParticipantResponse } from '@/apis/login';
import ParticipantUpdateSchema, {
  ParticipantUpdateSchemaType,
} from '@/schema/profile/ParticipantUpdateSchema';

interface UseFormParticipantUserInfoProps {
  userInfo: ParticipantResponse;
}

const useFormParticipantUserInfo = ({ userInfo }: UseFormParticipantUserInfoProps) => {
  const { mutate: updateParticipantInfo, isPending } = useUpdateParticipantInfoMutation();

  const { memberInfo, basicAddressInfo, additionalAddressInfo, matchType } = userInfo;

  const form = useForm<ParticipantUpdateSchemaType>({
    resolver: zodResolver(ParticipantUpdateSchema()),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      contactEmail: memberInfo.contactEmail,
      name: memberInfo.name,
      basicAddressInfo: basicAddressInfo,
      additionalAddressInfo: additionalAddressInfo,
      matchType: matchType,
    },
  });

  const region = useWatch({
    control: form.control,
    name: 'basicAddressInfo.region',
  });

  const additionalRegion = useWatch({
    control: form.control,
    name: 'additionalAddressInfo.region',
  });

  const onSubmit = (onSuccess: () => void) => {
    const formData = form.getValues();

    const formattedData = {
      ...formData,
      additionalAddressInfo:
        Object.values(formData.additionalAddressInfo ?? {}).filter(Boolean).length > 0
          ? formData.additionalAddressInfo
          : null,
    };

    updateParticipantInfo(formattedData, {
      onSuccess,
    });
  };

  return {
    form,
    region,
    additionalRegion,
    handleSubmit: (onSuccess: () => void) => form.handleSubmit(() => onSubmit(onSuccess)),
    isLoading: isPending,
  };
};

export default useFormParticipantUserInfo;
