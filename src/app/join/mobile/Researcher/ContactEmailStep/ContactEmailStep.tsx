import TitleSection from '../../components/TitleSection/TitleSection';
import { mainContentLayout } from '../../page.css';
import NextButton from './NextButton/NextButton';

import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import EmailBadge from '@/components/EmailBadge/EmailBadge';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { LoginProvider } from '@/types/user';

interface ContactEmailStepProps {
  provider?: LoginProvider;
  oauthEmail?: string;
  onNext: () => void;
}

const ContactEmailStep = ({ provider, oauthEmail, onNext }: ContactEmailStepProps) => {
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

      <ContactEmailInput<ResearcherJoinSchemaType>
        contactEmailField="contactEmail"
        verifiedEmailField="verifiedContactEmail"
        onSuccess={onNext}
        autoFocus
      />
      <NextButton onNext={onNext} />
    </main>
  );
};

export default ContactEmailStep;
