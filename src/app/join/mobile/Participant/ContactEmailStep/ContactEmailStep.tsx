import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import ServiceAgreeBottomSheet from '../../components/ServiceAgreeBottomSheet/ServiceAgreeBottomSheet';
import TitleSection from '../../components/TitleSection/TitleSection';
import {
  email,
  emailWrapper,
  emailInput,
  mainContentLayout,
  bottomButtonLayout,
} from '../../page.css';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoQuery from '@/app/join/hooks/useCheckValidEmailInfoQuery';
import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import Button from '@/components/Button/Button';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import useOverlay from '@/hooks/useOverlay';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';
import { LoginProvider } from '@/types/user';

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
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const {
    refetch,
    isLoading: isLoadingCheck,
    isError: isEmailDuplicateError,
    isSuccess: isEmailValid,
  } = useCheckValidEmailInfoQuery(contactEmail);

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);
  const [isShowNextButton, setIsShowNextButton] = useState(false);

  const { open, close } = useOverlay();

  const isValidCheck = isTermOfService && isPrivacy;

  const handleCheckValidEmail = async () => {
    const query = await refetch();
    setIsValidToastOpen(true);

    if (query.isSuccess) {
      setIsShowNextButton(true);
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
    }
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
      <ButtonInput<ParticipantJoinSchemaType>
        className={emailInput}
        control={control}
        name="contactEmail"
        onClick={handleCheckValidEmail}
        isLoading={isLoadingCheck}
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

      {isShowNextButton && (
        <div className={bottomButtonLayout}>
          <Button
            variant="primary"
            size="small"
            height="56px"
            disabled={!isEmailValid || !isValidCheck}
            onClick={onNext}
          >
            다음
          </Button>
        </div>
      )}
    </main>
  );
};

export default ContactEmailStep;
