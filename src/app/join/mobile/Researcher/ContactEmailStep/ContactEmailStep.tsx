import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import TitleSection from '../../components/TitleSection/TitleSection';
import { email, emailWrapper, emailInput, mainContentLayout } from '../../page.css';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
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
  const { control, getValues } = useFormContext<ResearcherJoinSchemaType>();

  const {
    mutate: checkValidEmail,
    isPending: isLoadingCheck,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoMutation();

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues('contactEmail'), {
      onSuccess: () => {
        onNext();
      },
      onSettled: () => {
        setIsValidToastOpen(true);
      },
    });
  };

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

      <ButtonInput<ResearcherJoinSchemaType>
        className={emailInput}
        control={control}
        name="contactEmail"
        onClick={handleCheckValidEmail}
        isLoading={isLoadingCheck}
        toast={
          <EmailToast
            title={isEmailDuplicateError ? '중복된 이메일이에요' : '사용 가능한 이메일이에요'}
            isToastOpen={isValidToastOpen}
            setIsToastOpen={setIsValidToastOpen}
            isError={isEmailDuplicateError}
          />
        }
      />
    </main>
  );
};

export default ContactEmailStep;
