import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  errorMessage,
  inputContainer,
  joinInput,
  univEmailInputContainer,
} from './UnivEmailInputContainer.css';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import AuthCodeInput from '@/app/join/desktop/Researcher/JoinEmailStep/UnivAuthInput/AuthCodeInput/AuthCodeInput';
import {
  editButton,
  univAuthButton,
  univInputWrapper,
} from '@/app/join/desktop/Researcher/JoinEmailStep/UnivAuthInput/UnivAuthInput.css';
import useAuthCodeTimer from '@/app/join/hooks/useAuthCodeTimer';
import useSendUnivAuthCodeMutation from '@/app/join/hooks/useSendUnivAuthCodeMutation';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const getButtonText = ({ isLoading, canEdit }: { isLoading: boolean; canEdit: boolean }) => {
  if (isLoading) return '전송 중...';
  if (canEdit) return '수정';
  return '인증번호 전송';
};

interface UnivEmailInputContainerProps {
  openServiceAgreeBottomSheet: () => void;
}

const UnivEmailInputContainer = ({ openServiceAgreeBottomSheet }: UnivEmailInputContainerProps) => {
  const { authTimer, startTimer, stopTimer } = useAuthCodeTimer();
  const { control, getValues, setValue, clearErrors, trigger } =
    useFormContext<ResearcherJoinSchemaType>();

  const {
    data: authCodeData,
    mutate: sendEmail,
    error: authCodeError,
    isPending: isLoadingSend,
  } = useSendUnivAuthCodeMutation();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const isEmailVerified = useWatch({ name: 'isEmailVerified', control });

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
          openServiceAgreeBottomSheet();
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
    <>
      <div className={univEmailInputContainer}>
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
            openServiceAgreeBottomSheet={openServiceAgreeBottomSheet}
          />
        )}
      </div>
      <EmailToast
        title={`인증번호가 발송되었어요. (${authCodeData?.requestCount}회 / 하루 최대 3회)`}
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </>
  );
};

export default UnivEmailInputContainer;
