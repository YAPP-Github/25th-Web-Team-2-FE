import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import FunnelLayout from '../../components/FunnelLayout/FunnelLayout';
import { JoinLayout } from '../../components/JoinLayout/JoinLayout';
import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useResearcherJoin } from '../../hooks/useResearcherJoin';
import { DESKTOP_RESEARCHER_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';

import { Researcher } from '.';

import { LoginProvider } from '@/types/user';

const ResearcherForm = () => {
  const { FunnelProvider, Funnel, Step, setStep } = useFunnel(DESKTOP_RESEARCHER_JOIN_STEP_LIST);

  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail ?? '';
  const provider = session?.provider as LoginProvider;

  const { researcherMethods, handleSubmit } = useResearcherJoin({
    initialValues: { oauthEmail, provider },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  return (
    <FormProvider {...researcherMethods}>
      <JoinLayout.FormGuard>
        <FunnelProvider>
          <FunnelLayout title="연구자 회원가입">
            <Funnel>
              <Step name={STEP.email}>
                <Researcher.EmailStep onNext={() => setStep(STEP.info)} />
              </Step>
              <Step name={STEP.info}>
                <Researcher.InfoStep handleSubmit={handleSubmit} />
              </Step>
              <Step name={STEP.success}>
                <JoinSuccessStep />
              </Step>
            </Funnel>
          </FunnelLayout>
        </FunnelProvider>
      </JoinLayout.FormGuard>
    </FormProvider>
  );
};

export default ResearcherForm;
