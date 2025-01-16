'use client';

import { css, Theme } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';

import JoinCheckbox from './components/JoinCheckbox/JoinCheckbox';

import { sendUnivAuthCode, verifyUnivAuthCode } from '@/apis/login';
import Logo from '@/assets/images/logo.svg';
import theme from '@/styles/theme';
import { useState } from 'react';

// TODO: 이미 인증된 메일일 경우 에러 처리
const useSendUnivAuthCodeMutation = () => {
  return useMutation({
    mutationFn: sendUnivAuthCode,
    onSuccess: () => {
      // TODO: 토스트 메시지: 인증번호가 발송되었어요
    },
  });
};

const useVerifyUnivAuthCodeMutation = () => {
  return useMutation({
    mutationFn: ({ univEmail, inputCode }: { univEmail: string; inputCode: string }) =>
      verifyUnivAuthCode(univEmail, inputCode),
    onSuccess: () => {
      // TODO: 토스트 메시지: 이메일 인증이 완료되었어요
    },
  });
};

interface FormInput {
  socialEmail: string;
  contactEmail: string;
  univEmail: string;
  authCode: string;
  isAllCheck: boolean;
  isTermOfService: boolean;
  isPrivacy: boolean;
  isAdvertise: boolean;
}

export default function JoinPage() {
  const socialEmail = sessionStorage.getItem('email') || '';

  const { mutate: sendEmail, error: sendError } = useSendUnivAuthCodeMutation();
  const { mutate: verifyEmail, isSuccess: isSuccessVerify } = useVerifyUnivAuthCodeMutation();

  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    control,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      socialEmail,
      contactEmail: '',
      univEmail: '',
      authCode: '',
      isAllCheck: false,
      isTermOfService: false,
      isPrivacy: false,
      isAdvertise: false,
    },
  });

  const handleAllCheck = () => {
    const isChecked = !watch('isAllCheck');
    setValue('isAllCheck', isChecked);
    setValue('isTermOfService', isChecked);
    setValue('isPrivacy', isChecked);
    setValue('isAdvertise', isChecked);
  };

  // TODO: 인증 번호 타이머 제거
  const handleClickEdit = () => {
    setIsEmailSent(false);
  };

  const handleSendUnivAuthCode = async () => {
    const univEmail = getValues('univEmail');
    sendEmail(univEmail, { onSuccess: () => setIsEmailSent(true) });
  };

  const handleVerifyUniv = () => {
    const univEmail = getValues('univEmail');
    const authCode = getValues('authCode');
    verifyEmail({ univEmail, inputCode: authCode });
  };

  const allValid =
    watch('contactEmail') &&
    watch('univEmail') &&
    isSuccessVerify &&
    (watch('isAllCheck') || (watch('isTermOfService') && watch('isPrivacy')));

  return (
    <form css={joinLayout}>
      <Image src={Logo} alt="로고" width={80} height={28} />
      <div css={contentContainer}>
        <div css={titleContainer}>
          <h2 css={joinTitle}>연구자 회원가입</h2>
          <div css={progressBarContainer}>
            <div css={progressBarFill(50)} />
          </div>
        </div>
        <div css={joinContentContainer}>
          <div css={inputContainer}>
            <label>소셜 로그인 아이디</label>
            <Controller
              name="socialEmail"
              control={control}
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
              render={({ field }) => <input {...field} placeholder="이메일 입력" disabled />}
            />
          </div>
          <div css={inputContainer}>
            <label>
              <span>연락 받을 이메일</span>
              <span css={required}>*</span>
            </label>
            <Controller
              name="contactEmail"
              control={control}
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="이메일 입력"
                  aria-invalid={errors.contactEmail ? true : false}
                />
              )}
            />
            {errors.contactEmail && <span css={errorMessage}>{errors.contactEmail.message}</span>}

            <div css={tipWrapper}>
              <span css={tip}>Tip</span>
              <span>로그인 아이디와 달라도 괜찮아요</span>
            </div>
          </div>
          <div css={inputContainer}>
            <label>
              <span>학교 메일 인증</span>
              <span css={required}>*</span>
            </label>

            <Controller
              name="univEmail"
              control={control}
              rules={{
                required: '학교 이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
              render={({ field }) => {
                const isDisabled = Boolean(errors.univEmail) || !watch('univEmail');

                return (
                  <div css={univInputWrapper}>
                    <input
                      {...field}
                      placeholder="학교 메일 입력"
                      aria-invalid={errors.univEmail ? true : false}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger('univEmail');
                      }}
                      disabled={isEmailSent}
                    />
                    <button
                      type="button"
                      css={[univAuthButton, isEmailSent && editButton]}
                      disabled={!isEmailSent && isDisabled}
                      onClick={isEmailSent ? handleClickEdit : handleSendUnivAuthCode}
                    >
                      {isEmailSent ? '수정' : '인증번호 전송'}
                    </button>
                  </div>
                );
              }}
            />
            {errors.univEmail && <span css={errorMessage}>{errors.univEmail.message}</span>}
            {sendError && <span css={errorMessage}>{sendError.message}</span>}
            {isEmailSent && (
              <Controller
                name="authCode"
                control={control}
                render={({ field }) => {
                  const isDisabled =
                    Boolean(errors.authCode) || !watch('authCode') || watch('authCode').length < 6;

                  return (
                    <div css={authInputContainer}>
                      <div css={univInputWrapper}>
                        <input
                          {...field}
                          placeholder="인증번호 6자리 입력"
                          type="number"
                          disabled={isSuccessVerify}
                          onChange={(e) => {
                            if (e.target.value.length <= 6) {
                              field.onChange(e);
                            }
                          }}
                        />
                        {!isSuccessVerify && (
                          <button
                            type="button"
                            css={authCodeButton}
                            disabled={isDisabled}
                            onClick={handleVerifyUniv}
                          >
                            인증
                          </button>
                        )}
                      </div>
                      <button type="button" css={sendAgainButton}>
                        인증번호 재전송
                      </button>
                    </div>
                  );
                }}
              />
            )}
          </div>

          <div css={termContainer}>
            <Controller
              name="isAllCheck"
              control={control}
              render={({ field }) => (
                <JoinCheckbox
                  label="이용약관에 모두 동의합니다"
                  isChecked={field.value}
                  onChange={handleAllCheck}
                  isAllCheck
                />
              )}
            />

            <Controller
              name="isTermOfService"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <JoinCheckbox
                  label="서비스 이용약관 동의"
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  isRequired
                />
              )}
            />
            <Controller
              name="isPrivacy"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <JoinCheckbox
                  label="개인정보 수집 및 이용 동의"
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  isRequired
                />
              )}
            />
            <Controller
              name="isAdvertise"
              control={control}
              render={({ field }) => (
                <JoinCheckbox
                  label="광고성 정보 이메일/SMS 수신 동의"
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </div>
        </div>
      </div>
      <button css={nextButton} disabled={!allValid}>
        다음
      </button>
    </form>
  );
}

export const joinLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin-top: 8.4rem;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const joinContentContainer = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  width: 100%;
  height: 67.6rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  border-radius: 1.2rem;
  padding: 3.2rem 4rem;
`;

export const inputContainer = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    ${theme.fonts.label.large.M14};
    color: ${theme.colors.text06};
    display: flex;
    gap: 0.4rem;
  }

  input {
    ${theme.fonts.body.normal.M16};
    color: ${theme.colors.text06};
    border: 0.1rem solid ${theme.colors.line01};
    padding: 1.6rem;
    border-radius: 1.2rem;

    :disabled {
      color: ${theme.colors.text03};
      background-color: ${theme.colors.field03};
    }

    ::placeholder {
      color: ${theme.colors.text03};
    }

    :focus {
      outline: 0.1rem solid ${theme.colors.lineTinted};
    }
  }

  input[aria-invalid='true'] {
    outline: 0.1rem solid ${theme.colors.textAlert};
  }
`;

export const required = (theme: Theme) => css`
  color: ${theme.colors.textAlert};
`;

export const univInputWrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.field01};
  border-radius: 1rem;

  input {
    width: 100%;
  }

  button:disabled {
    background-color: ${theme.colors.field04};
    color: ${theme.colors.text02};
  }
`;

export const univAuthButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  position: absolute;
  right: 1.2rem;
  top: 1rem;
  padding: 0.7rem 1.6rem;
  border-radius: 1rem;
  color: ${theme.colors.text01};
  background-color: ${theme.colors.primaryMint};
  border: none;

  :disabled {
    color: ${theme.colors.text02};
    background-color: ${theme.colors.field04};
  }
`;

export const editButton = css`
  color: ${theme.colors.text06};
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line02};
`;

export const authCodeButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  position: absolute;
  right: 1.2rem;
  top: 1rem;
  padding: 0.7rem 1.6rem;
  border-radius: 1rem;
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};

  :disabled {
    background-color: ${theme.colors.field04};
    color: ${theme.colors.text02};
  }
`;

export const authInputContainer = css`
  display: flex;
  flex-direction: column;
`;

export const sendAgainButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text03};
  text-decoration-line: underline;
  align-self: flex-end;
`;

export const errorMessage = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.textAlert};
`;

export const tipWrapper = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  display: flex;
  gap: 0.4rem;
  color: ${theme.colors.text02};
`;

export const tip = (theme: Theme) => css`
  color: ${theme.colors.textPrimary};
`;

export const joinContainer = css`
  display: flex;
  flex-direction: column;
`;

export const joinTitle = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
`;

export const progressBar = (theme: Theme) => css`
  width: 8rem;
  height: 0.6rem;
  background-color: ${theme.colors.field03};
  border-radius: 3rem;
`;

const progressBarContainer = (theme: Theme) => css`
  width: 8rem;
  height: 0.6rem;
  background-color: ${theme.colors.field03};
  border-radius: 0.6rem;
`;

const progressBarFill = (progress: number) => css`
  width: ${progress}%;
  height: 100%;
  background-color: ${theme.colors.primaryMint};
  border-radius: 0.6rem;
`;

export const termContainer = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};
  color: ${theme.colors.text06};
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 1.2rem;
`;

export const nextButton = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  border-radius: 1.2rem;
  padding: 1.2rem 0;
  width: 20rem;

  :disabled {
    color: ${theme.colors.text02};
    background-color: ${theme.colors.field04};
  }
`;
