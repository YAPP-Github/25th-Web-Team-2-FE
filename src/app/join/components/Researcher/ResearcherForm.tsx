import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useFunnel from '../../hooks/useFunnel';
import useResearcherJoinMutation from '../../hooks/useResearcherJoinMutation';
import { STEP } from '../../JoinPage.constants';
import { getProvider } from '../../JoinPage.utils';
import JoinSuccessStep from '../JoinSuccessStep/JoinSuccessStep';

import { Researcher } from '.';

import useSessionStorage from '@/hooks/useSessionStorage';
import ResearcherJoinSchema, { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const ResearcherForm = () => {
  const oauthEmail = useSessionStorage('email');

  const { mutate: joinResearcher } = useResearcherJoinMutation();

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
    },
  });

  const handleResearcherSubmit = () => {
    const formData = researcherMethods.getValues();
    joinResearcher(formData, { onSuccess: () => setStep(STEP.success) });
  };

  useEffect(() => {
    if (oauthEmail) {
      researcherMethods.setValue('oauthEmail', oauthEmail);
      researcherMethods.setValue('provider', getProvider(oauthEmail));
    }
  }, [oauthEmail, researcherMethods]);

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
          <JoinSuccessStep name={researcherMethods.getValues('name')} />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default ResearcherForm;
