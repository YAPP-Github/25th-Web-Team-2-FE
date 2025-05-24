import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import {
  email,
  emailWrapper,
  title,
  description,
  emailInput,
  mainContainer,
  emailTitleContainer,
  titleContainer,
} from '../../page.css';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoQuery from '@/app/join/hooks/useCheckValidEmailInfoQuery';
import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';
import { LoginProvider } from '@/types/user';
import useOverlay from '@/hooks/useOverlay';
import ServiceAgreeBottomSheet from '../../ServiceAgreeBottomSheet/ServiceAgreeBottomSheet';

const logoMap = {
  NAVER: Naver,
  GOOGLE: Google,
};

interface ContactEmailStepProps {
  onNext: () => void;
  provider?: LoginProvider;
  oauthEmail?: string;
}

const ContactEmailStep = ({ onNext, provider, oauthEmail }: ContactEmailStepProps) => {
  const methods = useFormContext<ParticipantJoinSchemaType>();
  const { control } = methods;

  const contactEmail = useWatch({ name: 'contactEmail', control });

  const {
    refetch,
    isLoading: isLoadingCheck,
    isSuccess: isValidEmail,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoQuery(contactEmail);

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const { open, close } = useOverlay();

  const handleCheckValidEmail = async () => {
    await refetch();
    setIsValidToastOpen(true);

    open(() => (
      <FormProvider {...methods}>
        <ServiceAgreeBottomSheet
          onConfirm={() => {
            onNext();
            close();
          }}
        />
      </FormProvider>
    ));
  };

  const titleText = '연락 받을 이메일을 입력해 주세요';
  const descriptionText = '로그인 아이디와 달라도 괜찮아요';

  if (!provider) {
    return null;
  }

  return (
    <main className={mainContainer}>
      <div className={emailTitleContainer}>
        <div className={titleContainer}>
          <h2 className={title}>{titleText}</h2>
          <h3 className={description}>{descriptionText}</h3>
        </div>
        <div className={emailWrapper}>
          <Image src={logoMap[provider]} alt="로고" width={24} height={24} />
          <span className={email}>{oauthEmail}</span>
        </div>
      </div>

      <ButtonInput<ParticipantJoinSchemaType>
        className={emailInput}
        control={control}
        name="contactEmail"
        onClick={handleCheckValidEmail}
        isLoading={isLoadingCheck}
        isSuccess={isValidEmail}
        setIsValidToastOpen={setIsValidToastOpen}
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
