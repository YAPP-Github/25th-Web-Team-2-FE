import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useResearcherJoin } from '../../hooks/useResearcherJoin';
import { DESKTOP_RESEARCHER_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';

import { Researcher } from '.';

import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { LoginProvider } from '@/types/user';

interface ResearcherFormProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const AUTO_INPUT_FIELDS: (keyof ResearcherJoinSchemaType)[] = ['oauthEmail'];

const ResearcherForm = ({ onDirtyChange }: ResearcherFormProps) => {
  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail;
  const provider = session?.provider;

  const { Funnel, Step, setStep } = useFunnel(DESKTOP_RESEARCHER_JOIN_STEP_LIST);

  const { researcherMethods, handleSubmit } = useResearcherJoin({
    initialValues: {
      provider: provider as LoginProvider,
      oauthEmail: oauthEmail || '',
    },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  const isUserInputDirty = Object.keys(researcherMethods.formState.dirtyFields).some(
    (key) => !AUTO_INPUT_FIELDS.includes(key as keyof ResearcherJoinSchemaType),
  );

  useEffect(() => {
    onDirtyChange?.(isUserInputDirty);
  }, [isUserInputDirty, onDirtyChange]);

  return (
    <FormProvider {...researcherMethods}>
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
    </FormProvider>
  );
};

export default ResearcherForm;
