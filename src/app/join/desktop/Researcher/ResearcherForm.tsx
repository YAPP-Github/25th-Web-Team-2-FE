'use client';

import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import { LoginProvider } from '@/types/user';
import { STEP } from '@constants/steps';
import FunnelLayout from '@join/components/FunnelLayout';
import FunnelStepGuard from '@join/components/FunnelStepGuard';
import { JoinLayout } from '@join/components/JoinLayout';
import JoinSuccessStep from '@join/components/JoinSuccessStep';
import { DESKTOP_RESEARCHER_JOIN_STEP_LIST } from '@join/constants/steps';
import useFunnel from '@join/hooks/useFunnel';
import { useResearcherJoin } from '@join/hooks/useResearcherJoin';

import { Researcher } from '.';

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
