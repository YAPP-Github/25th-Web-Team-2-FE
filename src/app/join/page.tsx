'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';

import JoinSuccessStep from './components/JoinSuccessStep/JoinSuccessStep';
import { Participant } from './components/Participant';
import { Researcher } from './components/Researcher';
import useFunnel from './hooks/useFunnel';
import useParticipantJoinMutation from './hooks/useParticipantJoinMutation';
import useResearcherJoinMutation from './hooks/useResearcherJoinMutation';
import {
  contentContainer,
  joinLayout,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from './JoinPage.styles';
import { getProvider } from './JoinPage.utils';

import Logo from '@/assets/images/logo.svg';
import { ROLE } from '@/constants/config';
import ResearcherJoinSchema, { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import ParticipantJoinSchema, {
  ParticipantJoinSchemaType,
} from '@/schema/join/ParticipantJoinSchema';

const STEP = {
  email: 'email',
  info: 'info',
  success: 'success',
} as const;

export default function JoinPage() {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const role = sessionStorage.getItem('role') || '';
  const provider = getProvider(oauthEmail);
  const { mutate: joinResearcher } = useResearcherJoinMutation();
  const { mutate: joinParticipant } = useParticipantJoinMutation();

  const researcherMethods = useForm<ResearcherJoinSchemaType>({
    resolver: zodResolver(ResearcherJoinSchema()),
    mode: 'onChange',
    defaultValues: {
      oauthEmail: oauthEmail,
      provider,
      univEmail: '',
      name: '',
      univName: '',
      major: '',
    },
  });

  const participantMethods = useForm<ParticipantJoinSchemaType>({
    resolver: zodResolver(ParticipantJoinSchema()),
    mode: 'onChange',
    defaultValues: {
      oauthEmail: oauthEmail,
      provider,
    },
  });

  const { Funnel, step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const handleResearcherSubmit = () => {
    const formData = researcherMethods.getValues();
    joinResearcher(formData, { onSuccess: () => setStep(STEP.success) });
  };

  const handleParticipantSubmit = () => {
    const formData = participantMethods.getValues();

    const formattedData = {
      ...formData,
      birthDate: formData.birthDate.replaceAll('.', '-'),
    };

    joinParticipant(formattedData, {
      onSuccess: () => setStep(STEP.success),
    });
  };

  if (role === ROLE.researcher) {
    return (
      <section css={joinLayout}>
        <Image src={Logo} alt="로고" width={80} height={28} />
        <div css={contentContainer}>
          <div css={titleContainer}>
            <h2 css={joinTitle}>연구자 회원가입</h2>
            <div css={progressBarContainer}>
              <div css={progressBarFill} style={{ width: step === STEP.email ? '50%' : '100%' }} />
            </div>
          </div>
          <FormProvider {...researcherMethods}>
            <Funnel>
              <Funnel.Step name={STEP.email}>
                <Researcher.EmailStep onNext={() => setStep(STEP.info)} />
              </Funnel.Step>
              <Funnel.Step name={STEP.info}>
                <Researcher.InfoStep
                  handleSubmit={() => researcherMethods.handleSubmit(handleResearcherSubmit)}
                />
              </Funnel.Step>
              <Funnel.Step name={STEP.success}>
                <JoinSuccessStep name={researcherMethods.getValues('name')} />
              </Funnel.Step>
            </Funnel>
          </FormProvider>
        </div>
      </section>
    );
  }

  return (
    <section css={joinLayout}>
      <Image src={Logo} alt="로고" width={80} height={28} />
      <div css={contentContainer}>
        <div css={titleContainer}>
          <h2 css={joinTitle}>참여자 회원가입</h2>
          <div css={progressBarContainer}>
            <div css={progressBarFill} style={{ width: step === STEP.email ? '50%' : '100%' }} />
          </div>
        </div>
        <FormProvider {...participantMethods}>
          <Funnel>
            <Funnel.Step name={STEP.email}>
              <Participant.EmailStep onNext={() => setStep(STEP.info)} />
            </Funnel.Step>
            <Funnel.Step name={STEP.info}>
              <Participant.InfoStep
                handleSubmit={participantMethods.handleSubmit(handleParticipantSubmit)}
              />
            </Funnel.Step>
            <Funnel.Step name={STEP.success}>
              <JoinSuccessStep name={participantMethods.getValues('name')} />
            </Funnel.Step>
          </Funnel>
        </FormProvider>
      </div>
    </section>
  );
}
