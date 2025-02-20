'use client';

import * as Toast from '@radix-ui/react-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

import useUserInfo from '@/app/home/hooks/useUserInfo';
import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[post_id]/components/ParticipationGuideModal/ParticipationGuideModal.css';
import Icon from '@/components/Icon';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { colors } from '@/styles/colors';

const UploadContainer = () => {
  const router = useRouter();
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);

  const [images, setImages] = useState<(File | string)[]>([]);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [successToast, setSuccessToast] = useState(true);

  const [loading, setLoading] = useState(true);

  const { form, handleSubmit } = useManageExperimentPostForm({
    addLink,
    addContact,
    setOpenAlertModal,
    images,
    isEdit: false,
    setSuccessToast,
  });

  // todo middleware 적용 전 임시 redirect
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();

  useEffect(() => {
    if (!isUserInfoLoading && userInfo?.memberInfo.role !== 'RESEARCHER') {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, [userInfo, router, isUserInfoLoading]);

  if (loading) return <div>로딩 중...</div>;

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

      {/* 공고 등록 실패 시 alert Modal */}
      <AlertModal
        title="공고 등록에 실패했어요"
        description="시간을 두고 다시 시도해 주세요"
        open={openAlertModal}
        onOpenChange={setOpenAlertModal}
        handleCloseModal={() => {
          setOpenAlertModal(false);
        }}
      />

      {/* 공고 등록 성공 시 successToast */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={successToast}
          onOpenChange={setSuccessToast}
          duration={800}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>공고가 등록되었어요!</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </FormProvider>
  );
};

export default UploadContainer;
