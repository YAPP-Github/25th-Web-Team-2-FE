import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useParticipantJoinMutation from '../hooks/useParticipantJoinMutation';

import ParticipantJoinSchema, {
  ParticipantJoinSchemaType,
} from '@/schema/join/ParticipantJoinSchema';

interface UseParticipantJoinProps {
  onSuccess: () => void;
  initialValues?: Partial<ParticipantJoinSchemaType>;
}

export const useParticipantJoin = ({ onSuccess, initialValues }: UseParticipantJoinProps) => {
  const participantMethods = useForm<ParticipantJoinSchemaType>({
    resolver: zodResolver(ParticipantJoinSchema()),
    mode: 'onBlur',
    defaultValues: {
      provider: initialValues?.provider,
      oauthEmail: initialValues?.oauthEmail,
      contactEmail: '',
      name: '',
      birthDate: '',
      basicAddressInfo: {
        region: '',
        area: '',
      },
      adConsent: false,
      matchConsent: false,
    },
  });

  const { mutate: joinParticipant } = useParticipantJoinMutation();

  const handleParticipantSubmit = () => {
    const formData = participantMethods.getValues();

    const formattedData = {
      ...formData,
      birthDate: formData.birthDate.replaceAll('.', '-'),
      additionalAddressInfo:
        Object.values(formData.additionalAddressInfo ?? {}).filter(Boolean).length > 0
          ? formData.additionalAddressInfo
          : null,
    };

    joinParticipant(formattedData, {
      onSuccess,
    });
  };

  return {
    participantMethods,
    handleSubmit: participantMethods.handleSubmit(handleParticipantSubmit),
  };
};
