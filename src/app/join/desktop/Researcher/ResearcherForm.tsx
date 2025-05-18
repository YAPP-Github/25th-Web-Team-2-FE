import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import useResearcherJoinMutation from '../../hooks/useResearcherJoinMutation';
import { STEP } from '../../JoinPage.constants';

import { Researcher } from '.';

import ResearcherJoinSchema, { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { LoginProvider } from '@/types/user';

const ResearcherForm = () => {
  const { mutate: joinResearcher } = useResearcherJoinMutation();

  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail;
  const provider = session?.provider;

  const { Funnel, Step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const researcherMethods = useForm<ResearcherJoinSchemaType>({
    resolver: zodResolver(ResearcherJoinSchema()),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      oauthEmail: '',
      contactEmail: '',
      univEmail: '',
      name: '',
      univName: '',
      major: '',
      adConsent: false,
    },
  });

  const handleResearcherSubmit = () => {
    const formData = researcherMethods.getValues();
    joinResearcher(formData, { onSuccess: () => setStep(STEP.success) });
  };

  useEffect(() => {
    if (oauthEmail && provider) {
      researcherMethods.setValue('oauthEmail', oauthEmail);
      researcherMethods.setValue('provider', provider as LoginProvider);
    }
  }, [researcherMethods, oauthEmail, provider]);

  return (
    <FormProvider {...researcherMethods}>
      <Funnel>
        <Step name={STEP.email}>
          <Researcher.EmailStep onNext={() => setStep(STEP.info)} />
        </Step>
        <Step name={STEP.info}>
          <Researcher.InfoStep
            handleSubmit={researcherMethods.handleSubmit(handleResearcherSubmit)}
          />
        </Step>
        <Step name={STEP.success}>
          <JoinSuccessStep />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default ResearcherForm;
