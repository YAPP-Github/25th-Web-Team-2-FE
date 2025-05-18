import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useParticipantJoinMutation from '../hooks/useParticipantJoinMutation';

import ParticipantJoinSchema, {
  ParticipantJoinSchemaType,
} from '@/schema/join/ParticipantJoinSchema';

const PARTICIPANT_DEFAULT_VALUES = {
  oauthEmail: '',
  contactEmail: '',
  name: '',
  birthDate: '',
  basicAddressInfo: {
    region: '',
    area: '',
  },
  adConsent: false,
  matchConsent: false,
} as const;

interface UseParticipantJoinProps {
  onSuccess: () => void;
}

export const useParticipantJoin = ({ onSuccess }: UseParticipantJoinProps) => {
  const participantMethods = useForm<ParticipantJoinSchemaType>({
    resolver: zodResolver(ParticipantJoinSchema()),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: PARTICIPANT_DEFAULT_VALUES,
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
