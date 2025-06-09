import { FormProvider } from 'react-hook-form';
import useFunnel from '../../hooks/useFunnel';
import { MOBILE_RESEARCHER_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';
import { Researcher } from '.';
import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import { useSession } from 'next-auth/react';
import { useResearcherJoin } from '../../hooks/useResearcherJoin';
import { LoginProvider } from '@/types/user';

const ResearcherForm = () => {
  const { data: session } = useSession();
  const provider = session?.provider;
  const oauthEmail = session?.oauthEmail;

  const { Funnel, Step, setStep, goToNext } = useFunnel(MOBILE_RESEARCHER_JOIN_STEP_LIST);

  const { researcherMethods, handleSubmit } = useResearcherJoin({
    initialValues: {
      provider: provider as LoginProvider,
      oauthEmail: oauthEmail || '',
    },
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
