'use client';

import { css, Theme } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';

import Checkbox from './Checkbox';

import Logo from '@/assets/images/logo.svg';

export default function JoinPage() {
  const socialEmail = sessionStorage.getItem('email') || '';
  const [contactEmail, setContactEmail] = useState('');
  const [univEmail, setUnivEmail] = useState('');

  const [isAllCheck, setIsAllCheck] = useState(false);

  const [isTermOfService, setIsTermOfService] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [isAdvertise, setIsAdvertise] = useState(false);

  const handleClickAllCheck = () => {
    setIsAllCheck((prev) => {
      setIsTermOfService(!prev);
      setIsPrivacy(!prev);
      setIsAdvertise(!prev);
      return !prev;
    });
  };

  return (
    <div css={joinLayout}>
      <Image src={Logo} alt="로고" width={80} height={28} />
      <div css={contentContainer}>
        <div css={titleContainer}>
          <h2 css={joinTitle}>연구자 회원가입</h2>
          <div>프로그래스바</div>
        </div>
        <div css={joinContentContainer}>
          <div css={inputContainer}>
            <label>소셜 로그인 아이디</label>
            <input value={socialEmail} disabled />
          </div>
          <div css={inputContainer}>
            <label>연락 받을 이메일</label>
            <input
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="이메일 입력"
              required
            />
            <div css={tipWrapper}>
              <span css={tip}>Tip</span>
              <span>로그인 아이디와 달라도 괜찮아요</span>
            </div>
          </div>
          <div css={inputContainer}>
            <label>학교 메일 인증</label>
            <div css={univInputWrapper}>
              <input
                value={univEmail}
                onChange={(e) => setUnivEmail(e.target.value)}
                placeholder="학교 메일 입력"
                required
              />
              <button css={univAuthButton}>인증번호 전송</button>
            </div>
          </div>
          <div css={termContainer}>
            <Checkbox
              label="이용약관에 모두 동의합니다"
              isChecked={isAllCheck}
              onChange={handleClickAllCheck}
              isAllCheck
            />
            <Checkbox
              label="서비스 이용약관 동의"
              isChecked={isTermOfService}
              onChange={() => setIsTermOfService((prev) => !prev)}
              isRequired
            />
            <Checkbox
              label="개인정보 수집 및 이용 동의"
              isChecked={isPrivacy}
              onChange={() => setIsPrivacy((prev) => !prev)}
              isRequired
            />
            <Checkbox
              label="광고성 정보 이메일/SMS 수신 동의"
              isChecked={isAdvertise}
              onChange={() => setIsAdvertise((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <button css={nextButton}>다음</button>
    </div>
  );
}

export const joinLayout = css`
  display: flex;
  height: calc(100vh - 26.2rem);
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
  }

  input {
    ${theme.fonts.body.normal.M16};
    color: ${theme.colors.text06};
    border: none;
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
`;

export const univInputWrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1rem;

  input {
    width: 100%;
  }
`;

export const univAuthButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  position: absolute;
  right: 1.2rem;
  top: 1rem;
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  padding: 0.7rem 1.6rem;
  border-radius: 1rem;
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
  color: ${theme.colors.text02};
  background-color: ${theme.colors.field04};
  border-radius: 1.2rem;
  padding: 1.2rem 0;
  width: 20rem;
`;
