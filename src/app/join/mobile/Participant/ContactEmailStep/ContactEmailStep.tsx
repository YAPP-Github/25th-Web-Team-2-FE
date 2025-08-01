import { FormProvider, useFormContext } from 'react-hook-form';

import ServiceAgreeBottomSheet from '../../components/ServiceAgreeBottomSheet/ServiceAgreeBottomSheet';
import TitleSection from '../../components/TitleSection/TitleSection';
import { mainContentLayout } from '../../page.css';
import NextButton from './NextButton/NextButton';

import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import EmailBadge from '@/components/EmailBadge/EmailBadge';
import useOverlay from '@/hooks/useOverlay';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';
import { LoginProvider } from '@/types/user';

interface ContactEmailStepProps {
  onNext: () => void;
  provider?: LoginProvider;
  oauthEmail?: string;
}

const ContactEmailStep = ({ onNext, provider, oauthEmail }: ContactEmailStepProps) => {
  const form = useFormContext<ParticipantJoinSchemaType>();
  const { open, close } = useOverlay();

  const openServiceAgreeBottomSheet = () => {
    open(() => (
      <FormProvider {...form}>
        <ServiceAgreeBottomSheet
          onConfirm={() => {
            onNext();
            close();
          }}
        />
      </FormProvider>
    ));
  };

  if (!provider) {
    return null;
  }

  return (
    <main className={mainContentLayout}>
      <TitleSection
        title="연락 받을 이메일을 입력해 주세요"
        description="로그인 아이디와 달라도 괜찮아요"
        emailBadge={<EmailBadge provider={provider} oauthEmail={oauthEmail} />}
      />
      <ContactEmailInput<ParticipantJoinSchemaType>
        contactEmailField="contactEmail"
        verifiedEmailField="verifiedContactEmail"
        onSuccess={openServiceAgreeBottomSheet}
      />
      <NextButton onNext={onNext} openServiceAgreeBottomSheet={openServiceAgreeBottomSheet} />
    </main>
  );
};

export default ContactEmailStep;
