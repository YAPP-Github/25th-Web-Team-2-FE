'use client';

import { css, Theme } from '@emotion/react';
import Image from 'next/image';

import { FormProvider, useForm } from 'react-hook-form';

import Logo from '@/assets/images/logo.svg';
import theme from '@/styles/theme';
import JoinInput from './components/JoinInput/JoinInput';

import UnivAuthInput from './UnivAuthInput/UnivAuthInput';
import JoinCheckboxContainer from './JoinCheckboxContainer/JoinCheckboxContainer';
import { FormInput } from './Join.types';
import useVerifyUnivAuthCodeMutation from './hooks/useVerifyUnivAuthCodeMutation';

export default function JoinPage() {
  const socialEmail = sessionStorage.getItem('email') || '';
  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();

  const methods = useForm<FormInput>({
    defaultValues: {
      socialEmail: socialEmail,
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
    const isChecked = !methods.watch('isAllCheck');
    methods.setValue('isAllCheck', isChecked);
    methods.setValue('isTermOfService', isChecked);
    methods.setValue('isPrivacy', isChecked);
    methods.setValue('isAdvertise', isChecked);
  };

  const handleVerifyUniv = () => {
    const univEmail = methods.getValues('univEmail');
    const authCode = methods.getValues('authCode');
    verifyEmail({ univEmail, inputCode: authCode });
  };

  const allValid =
    methods.watch('contactEmail') &&
    methods.watch('univEmail') &&
    isUnivVerify &&
    (methods.watch('isAllCheck') ||
      (methods.watch('isTermOfService') && methods.watch('isPrivacy')));

  return (
    <FormProvider {...methods}>
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
            <JoinInput
              name="socialEmail"
              control={methods.control}
              label="소셜 로그인 아이디"
              placeholder="이메일 입력"
              disabled
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
            />
            <JoinInput
              name="contactEmail"
              control={methods.control}
              label="연락 받을 이메일"
              placeholder="이메일 입력"
              required
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
              onChange={() => {
                methods.trigger('contactEmail');
              }}
              tip="로그인 아이디와 달라도 괜찮아요"
            />
            <UnivAuthInput isUnivVerify={isUnivVerify} handleVerifyUniv={handleVerifyUniv} />
            <JoinCheckboxContainer handleAllCheck={handleAllCheck} />
          </div>
        </div>
        <button css={nextButton} disabled={!allValid}>
          다음
        </button>
      </form>
    </FormProvider>
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
