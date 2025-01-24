'use client';

import * as Toast from '@radix-ui/react-toast';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  activeButton,
  buttonContainer,
  headerContainer,
  uploadButton,
  uploadContentLayout,
  uploadLayout,
} from './UploadContainer.styles';
import useUploadExperimentPost from '../../hooks/useUploadExperimentPost';
import ApplyMethodSection from '../ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '../DescriptionSection/DescriptionSection';
import OutlineSection from '../OutlineSection/OutlineSection';

import {
  toastLayout,
  toastTitle,
  toastViewport,
} from '@/app/post/[post_id]/components/ParticipationGuideModal/ParticipationGuideModal.styles';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const UploadContainer = () => {
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);

  const [openToast, setOpenToast] = useState(false);

  const { form, handleSubmit } = useUploadExperimentPost({
    addLink,
    addContact,
    setOpenToast,
  });

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
          <ApplyMethodSection
            addLink={addLink}
            setAddLink={setAddLink}
            addContact={addContact}
            setAddContact={setAddContact}
          />
        </div>

        {/* 버튼 */}
        <div css={buttonContainer}>
          <Link href={'/'}>
            <button css={activeButton}>이전으로</button>
          </Link>
          <button css={uploadButton} onClick={handleSubmit} type="submit">
            공고 등록하기
          </button>
        </div>
      </div>

      {/* 공고 등록 실패 시 토스트 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root css={toastLayout} open={openToast} onOpenChange={setOpenToast} duration={1500}>
          <Toast.Title css={toastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>공고 등록을 실패하였습니다.</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport css={toastViewport} />
      </Toast.Provider>
    </FormProvider>
  );
};

export default UploadContainer;
