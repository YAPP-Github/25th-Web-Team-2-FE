'use client';

import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import { Researcher } from '.';

import FunnelLayout from '@/app/join/components/FunnelLayout/FunnelLayout';
import FunnelStepGuard from '@/app/join/components/FunnelStepGuard/FunnelStepGuard';
import { JoinLayout } from '@/app/join/components/JoinLayout/JoinLayout';
import JoinSuccessStep from '@/app/join/components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '@/app/join/hooks/useFunnel';
import { useResearcherJoin } from '@/app/join/hooks/useResearcherJoin';
import { DESKTOP_RESEARCHER_JOIN_STEP_LIST, STEP } from '@/app/join/JoinPage.constants';
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
          <FunnelStepGuard isDirty={researcherMethods.formState.isDirty}>
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
          </FunnelStepGuard>
        </FunnelProvider>
      </JoinLayout.FormGuard>
    </FormProvider>
  );
};

export default ResearcherForm;
