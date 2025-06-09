import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  ResearcherJoinSchema,
  ResearcherJoinSchemaType,
  ResearcherJoinSubmitSchema,
} from '@/schema/join/ResearcherJoinSchema';
import useResearcherJoinMutation from './useResearcherJoinMutation';

interface UseResearcherJoinProps {
  onSuccess: () => void;
  initialValues?: Partial<ResearcherJoinSchemaType>;
}

export const useResearcherJoin = ({ onSuccess, initialValues }: UseResearcherJoinProps) => {
  const researcherMethods = useForm<ResearcherJoinSchemaType>({
    resolver: zodResolver(ResearcherJoinSchema()),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      oauthEmail: initialValues?.oauthEmail,
      provider: initialValues?.provider,
      contactEmail: '',
      univEmail: '',
      name: '',
      univName: '',
      major: '',
      adConsent: false,
      isTermOfService: false,
      isPrivacy: false,
      isEmailVerified: false,
    },
  });

  const { mutate: joinResearcher } = useResearcherJoinMutation();

  const handleResearcherSubmit = () => {
    const formData = researcherMethods.getValues();
    const submitData = ResearcherJoinSubmitSchema().parse(formData);

    joinResearcher(submitData, {
      onSuccess,
    });
  };

  return {
    researcherMethods,
    handleSubmit: researcherMethods.handleSubmit(handleResearcherSubmit),
  };
};
