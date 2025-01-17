import { Controller, useFormContext } from 'react-hook-form';
import {
  authCodeButton,
  authInputLayout,
  authTimerWrapper,
  sendAgainButton,
} from './AuthCodeInput.styles';
import { FormInput } from '@/app/join/JoinPage.types';
import { univInputWrapper } from '@/app/join/JoinPage.styles';
import { formatAuthTimer } from '@/app/join/JoinPage.utils';

interface AuthCodeInputProps {
  isUnivVerify: boolean;
  handleVerifyUniv: () => void;
  authTimer: number;
}

const AuthCodeInput = ({ isUnivVerify, handleVerifyUniv, authTimer }: AuthCodeInputProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormInput>();

  return (
    <Controller
      name="authCode"
      control={control}
      render={({ field }) => {
        const isDisabled =
          Boolean(errors.authCode) || !watch('authCode') || watch('authCode').length < 6;

        return (
          <div css={authInputLayout}>
            <div css={univInputWrapper}>
              <input
                {...field}
                placeholder="인증번호 6자리 입력"
                type="number"
                disabled={isUnivVerify}
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    field.onChange(e);
                  }
                }}
              />
              {!isUnivVerify && (
                <div css={authTimerWrapper}>
                  <span>{formatAuthTimer(authTimer)}</span>
                  <button
                    type="button"
                    css={authCodeButton}
                    disabled={isDisabled}
                    onClick={handleVerifyUniv}
                  >
                    인증
                  </button>
                </div>
              )}
            </div>
            <button type="button" css={sendAgainButton}>
              인증번호 재전송
            </button>
          </div>
        );
      }}
    />
  );
};

export default AuthCodeInput;
