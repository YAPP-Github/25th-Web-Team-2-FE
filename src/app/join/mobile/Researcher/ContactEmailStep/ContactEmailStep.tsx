import Image from 'next/image';

import TitleSection from '../../components/TitleSection/TitleSection';
import { email, emailWrapper, mainContentLayout } from '../../page.css';
import NextButton from './NextButton/NextButton';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { LoginProvider } from '@/types/user';

const logoMap = {
  NAVER: Naver,
  GOOGLE: Google,
};
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
        emailBadge={
          <div className={emailWrapper}>
            <Image src={logoMap[provider]} alt="로고" width={24} height={24} />
            <span className={email}>{oauthEmail}</span>
          </div>
        }
      />

      <ContactEmailInput<ResearcherJoinSchemaType>
        contactEmailField="contactEmail"
        verifiedEmailField="verifiedContactEmail"
        onSuccess={onNext}
      />
      <NextButton onNext={onNext} />
    </main>
  );
};

export default ContactEmailStep;
