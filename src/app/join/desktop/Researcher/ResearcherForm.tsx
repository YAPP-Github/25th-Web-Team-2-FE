import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import { JoinLayout } from '../../components/JoinLayout/JoinLayout';
import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useResearcherJoin } from '../../hooks/useResearcherJoin';
import { DESKTOP_RESEARCHER_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';

import { Researcher } from '.';

import { LoginProvider } from '@/types/user';

const ResearcherForm = () => {
  const { Funnel, Step, setStep } = useFunnel(DESKTOP_RESEARCHER_JOIN_STEP_LIST);

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
        <Funnel>
          <Step name={STEP.email}>
            <JoinLayout.Header />
            <JoinLayout.Container>
              <JoinLayout.Title title="연구자 회원가입" />
              <Researcher.EmailStep onNext={() => setStep(STEP.info)} />
            </JoinLayout.Container>
          </Step>
          <Step name={STEP.info}>
            <JoinLayout.Header />
            <JoinLayout.Container>
              <JoinLayout.Title title="연구자 회원가입" />
              <Researcher.InfoStep handleSubmit={handleSubmit} />
            </JoinLayout.Container>
          </Step>
          <Step name={STEP.success}>
            <JoinLayout.Container>
              <JoinSuccessStep />
            </JoinLayout.Container>
          </Step>
        </Funnel>
      </JoinLayout.FormGuard>
    </FormProvider>
  );
};

export default ResearcherForm;
