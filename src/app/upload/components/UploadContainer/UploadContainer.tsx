'use client';

import * as Toast from '@radix-ui/react-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  buttonVariants,
  buttonContainer,
  uploadContentLayout,
  uploadLayout,
  headerTitle,
  headerSubTitle,
} from './UploadContainer.css';
import useManageExperimentPostForm from '../../hooks/useManageExperimentPostForm';
import ApplyMethodSection from '../ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '../DescriptionSection/DescriptionSection';
import OutlineSection from '../OutlineSection/OutlineSection';

import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[post_id]/components/ParticipationGuideModal/ParticipationGuideModal.css';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const UploadContainer = () => {
  const router = useRouter();
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);

  const [openToast, setOpenToast] = useState(false);

  const [images, setImages] = useState<(File | string)[]>([]);

  const { form, handleSubmit } = useManageExperimentPostForm({
    addLink,
    addContact,
    setOpenToast,
    images,
    isEdit: false,
  });

  return (
    <FormProvider {...form}>
      <div className={uploadLayout}>
        <div>
          <h2 className={headerTitle}>실험에 대한 정보를 입력해 주세요</h2>
          <p className={headerSubTitle}>구체적일수록 참여자 매칭 확률이 높아져요</p>
        </div>

        <div className={uploadContentLayout}>
          {/* 실험 설명 */}
          <DescriptionSection images={images} setImages={setImages} />

          {/* 실험 개요 */}
          <OutlineSection />

          {/* 실험 참여 방법 */}
          <ApplyMethodSection
            addLink={addLink}
            setAddLink={setAddLink}
            addContact={addContact}
            setAddContact={setAddContact}
          />
        </div>

        {/* 버튼 */}
        <div className={buttonContainer}>
          <button className={buttonVariants.active} onClick={() => router.back()}>
            이전으로
          </button>

          <button className={buttonVariants.upload} onClick={handleSubmit} type="submit">
            {form.formState.isSubmitting ? '공고 등록 중' : '공고 등록하기'}
          </button>
        </div>
      </div>

      {/* 공고 등록 실패 시 토스트 알림 */}
      {/* TODO: 에러 상태에 따라 다르게 토스트 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={openToast}
          onOpenChange={setOpenToast}
          duration={1500}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>공고 등록을 실패하였습니다.</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </FormProvider>
  );
};

export default UploadContainer;
