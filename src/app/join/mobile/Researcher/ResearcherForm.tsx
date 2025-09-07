import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useResearcherJoin } from '../../hooks/useResearcherJoin';
import { MOBILE_RESEARCHER_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';

import { Researcher } from '.';

import { LoginProvider } from '@/types/user';

const ResearcherForm = () => {
  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail ?? '';
  const provider = session?.provider as LoginProvider;

  const { Funnel, Step, setStep, goToNext } = useFunnel(MOBILE_RESEARCHER_JOIN_STEP_LIST);

  const { researcherMethods, handleSubmit } = useResearcherJoin({
    initialValues: { oauthEmail, provider },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  return (
    <FormProvider {...researcherMethods}>
      <Funnel>
        <Step name={STEP.contactEmail}>
          <Researcher.ContactEmailStep
            provider={provider}
            oauthEmail={oauthEmail}
            onNext={goToNext}
          />
        </Step>
        <Step name={STEP.univEmail}>
          <Researcher.UnivEmailStep onNext={goToNext} />
        </Step>
        <Step name={STEP.info}>
          <Researcher.JoinInfoStep onSubmit={handleSubmit} />
        </Step>
        <Step name={STEP.success}>
          <JoinSuccessStep />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default ResearcherForm;
