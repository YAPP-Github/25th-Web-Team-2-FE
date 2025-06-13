import { useState } from 'react';
import { Controller, FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { univEmailVerificationContainer } from './UnivEmailStep.css';
import ServiceAgreeBottomSheet from '../../components/ServiceAgreeBottomSheet/ServiceAgreeBottomSheet';
import TitleSection from '../../components/TitleSection/TitleSection';
import { bottomButtonLayout, mainContentLayout } from '../../page.css';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import { errorMessage, joinInput } from '@/app/join/components/JoinInput/JoinInput.css';
import AuthCodeInput from '@/app/join/desktop/Researcher/JoinEmailStep/UnivAuthInput/AuthCodeInput/AuthCodeInput';
import {
  editButton,
  univAuthButton,
  univInputWrapper,
} from '@/app/join/desktop/Researcher/JoinEmailStep/UnivAuthInput/UnivAuthInput.css';
import useAuthCodeTimer from '@/app/join/hooks/useAuthCodeTimer';
import useSendUnivAuthCodeMutation from '@/app/join/hooks/useSendUnivAuthCodeMutation';
import Button from '@/components/Button/Button';
import { inputContainer } from '@/components/ButtonInput/ButtonInput.css';
import useOverlay from '@/hooks/useOverlay';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const getButtonText = ({ isLoading, canEdit }: { isLoading: boolean; canEdit: boolean }) => {
  if (isLoading) return '전송 중...';
  if (canEdit) return '수정';
  return '인증번호 전송';
};

interface UnivEmailStepProps {
  onNext: () => void;
}

const UnivEmailStep = ({ onNext }: UnivEmailStepProps) => {
  const form = useFormContext<ResearcherJoinSchemaType>();
  const { control, getValues, setValue, clearErrors, trigger } = form;

  const {
    data: authCodeData,
    mutate: sendEmail,
    error: authCodeError,
    isPending: isLoadingSend,
  } = useSendUnivAuthCodeMutation();

  const { open, close } = useOverlay();

  const { authTimer, startTimer, stopTimer } = useAuthCodeTimer();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const isEmailVerified = useWatch({ name: 'isEmailVerified', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const isValidCheck = isTermOfService && isPrivacy;

  const handleSendUnivAuthCode = () => {
    sendEmail(getValues('univEmail'), {
      onSuccess: () => {
        setIsEmailSent(true);
        setIsToastOpen(true);
        startTimer();
      },
      onError: (error) => {
        if (error.code === 'VE0007') {
          setValue('isEmailVerified', true);
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
        }
      },
    });
  };

  const handleClickEdit = () => {
    setIsEmailSent(false);
    setValue('isEmailVerified', false);
    stopTimer();
    clearErrors('univEmail');
  };

  return (
    <main className={mainContentLayout}>
      <TitleSection
        title="학교 메일을 입력해 주세요"
        description={`대학원생임을 인증하기 위해 필요해요\n추후 수정할 수 없으니 신중히 입력해 주세요`}
      />

      <div className={univEmailVerificationContainer}>
        <Controller
          name="univEmail"
          control={control}
          render={({ field, fieldState }) => {
            const canEdit = isEmailSent || isEmailVerified;
            const isButtonDisabled =
              (!isEmailSent && !field.value) || isLoadingSend || fieldState.invalid;

            const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e);
              await trigger('univEmail');
            };

            return (
              <div className={inputContainer}>
                <div className={univInputWrapper}>
                  <input
                    {...field}
                    style={{ width: '100%' }}
                    className={joinInput}
                    placeholder="학교 메일 입력"
                    aria-invalid={fieldState.invalid ? true : false}
                    disabled={isEmailVerified || isEmailSent}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={`${univAuthButton} ${canEdit ? editButton : ''}`}
                    disabled={isButtonDisabled}
                    onClick={canEdit ? handleClickEdit : handleSendUnivAuthCode}
                  >
                    {getButtonText({ isLoading: isLoadingSend, canEdit })}
                  </button>
                </div>
                {fieldState.error ? (
                  <span className={errorMessage}>{fieldState.error.message}</span>
                ) : (
                  <span className={errorMessage}>{authCodeError && authCodeError.message}</span>
                )}
              </div>
            );
          }}
        />

        {isEmailSent && (
          <AuthCodeInput
            authTimer={authTimer}
            handleSendUnivAuthCode={handleSendUnivAuthCode}
            stopTimer={stopTimer}
            onNext={onNext}
          />
        )}
      </div>
      <EmailToast
        title={`인증번호가 발송되었어요. (${authCodeData?.requestCount}회 / 하루 최대 3회)`}
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />

      {isEmailVerified && (
        <div className={bottomButtonLayout}>
          <Button
            variant="primary"
            size="small"
            height="56px"
            disabled={!isEmailVerified || !isValidCheck}
            onClick={onNext}
          >
            다음
          </Button>
        </div>
      )}
    </main>
  );
};

export default UnivEmailStep;
