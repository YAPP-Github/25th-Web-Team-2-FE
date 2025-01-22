'use client';

import { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import useUploadExperimentPost from '../../hooks/useUploadExperiemntPost';
import ApplyMethodSection from '../ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '../DescriptionSection/DescriptionSection';
import OutlineSection from '../OutlineSection/OutlineSection';

const UploadContainer = () => {
  const { form, handleSubmit } = useUploadExperimentPost();

  return (
    <FormProvider {...form}>
      <div css={uploadLayout}>
        <div css={headerContainer}>
          <h2>실험에 대한 정보를 입력해 주세요</h2>
          <p>구체적일수록 참여자 매칭 확률이 높아져요</p>
        </div>

        <div css={uploadContentLayout}>
          {/* 실험 개요 */}
          <OutlineSection />

          {/* 실험 설명 */}
          <DescriptionSection />

          {/* 실험 참여 방법 */}
          <ApplyMethodSection />
        </div>

        {/* 버튼 */}
        <div css={buttonContainer}>
          <Link href={'/'}>
            <button css={activeButton}>이전으로</button>
          </Link>
          <button css={uploadButton} onClick={handleSubmit}>
            공고 등록하기
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default UploadContainer;

export const uploadLayout = (theme: Theme) => css`
  display: flex;
  flex-flow: column nowrap;
  gap: 4rem;

  color: ${theme.colors.text06};

  h3 {
    ${theme.fonts.title.small.SB18};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.8rem;

    margin-bottom: 2rem;
  }
`;

export const headerContainer = (theme: Theme) => css`
  h2 {
    ${theme.fonts.title.large.SB24};
  }

  p {
    ${theme.fonts.label.large.R14};
    color: ${theme.colors.text03};
  }
`;

export const uploadContentLayout = (theme: Theme) => css`
  display: flex;
  flex-flow: column nowrap;
  gap: 4.8rem;

  > div {
    background-color: ${theme.colors.field01};
    border-radius: 1.2rem;

    padding: 3.2rem 2.8rem;
  }
`;

export const headingIcon = (theme: Theme) => css`
  ${theme.fonts.label.small.SB12};

  width: 1.8rem;
  height: 1.8rem;

  border-radius: 50%;
  text-align: center;
  padding: 0.2rem;

  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
`;

export const buttonContainer = (theme: Theme) => css`
  ${theme.fonts.body.normal.B16};

  width: 100%;
  height: 4rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

const activeButton = (theme: Theme) => css`
  color: ${theme.colors.text06};
  background-color: ${theme.colors.field04};
  border-radius: 1.2rem;
  padding: 0.8rem 1.6rem;
`;

const uploadButton = (theme: Theme) => css`
  color: ${theme.colors.text01};
  background-color: ${theme.colors.field09};
  border-radius: 1.2rem;
  padding: 0.8rem 1.6rem;
`;

export const outlineFormLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10.2rem 10.2rem 21.4rem;

  grid-column-gap: 3.2rem;
  grid-row-gap: 2.8rem;

  margin: 0 auto;
`;

export const input = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};

  width: 100%;
  max-width: 45.2rem;
  height: 4.8rem;

  padding: 10px;
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  outline: none;

  &::placeholder {
    color: ${theme.colors.text02};
  }

  &:focus {
    outline: 0.1rem solid ${theme.colors.lineTinted};
    outline-offset: 0;

    border: none;
  }
`;

export const label = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text05};

  margin-bottom: 0.8rem;
  display: block;
`;

export const ReferToDetailsContainer = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text04};

  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  justify-content: right;
`;
