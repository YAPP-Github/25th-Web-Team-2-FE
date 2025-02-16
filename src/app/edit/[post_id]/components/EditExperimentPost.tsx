'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Toast from '@radix-ui/react-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  alertDialogContent,
  alertDialogDescription,
  alertDialogTitle,
} from './EditExperimentPost.css';

import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[post_id]/components/ParticipationGuideModal/ParticipationGuideModal.css';
import ApplyMethodSection from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '@/app/upload/components/DescriptionSection/DescriptionSection';
import OutlineSection from '@/app/upload/components/OutlineSection/OutlineSection';
import {
  uploadLayout,
  buttonVariants,
  buttonContainer,
  headerSubTitle,
  uploadContentLayout,
  headerTitle,
} from '@/app/upload/components/UploadContainer/UploadContainer.css';
import useManageExperimentPostForm from '@/app/upload/hooks/useManageExperimentPostForm';
import Icon from '@/components/Icon';
import { closeButton, dialogOverlay } from '@/components/Modal/ConfirmModal/ConfirmModal.css';
import { colors } from '@/styles/colors';

const EditExperimentPost = ({ params }: { params: { post_id: string } }) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const router = useRouter();

  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [images, setImages] = useState<(File | string)[]>([]);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

  const { form, handleSubmit, isLoading, applyMethodData, isError } = useManageExperimentPostForm({
    isEdit,
    postId: params.post_id,
    addLink,
    addContact,
    setOpenToast,
    images,
  });

  // 기존 공고 데이터 불러오는 API 호출 실패 시 모달 열기
  useEffect(() => {
    if (isEdit && isError) {
      setOpenAlertDialog(true);
    }
  }, [isEdit, isError, setOpenAlertDialog]);

  // 모달 닫을 때 이전 페이지로 이동
  const handleCloseDialog = () => {
    setOpenAlertDialog(false);
    router.back();
  };

  useEffect(() => {
    if (applyMethodData) {
      setAddLink(!!applyMethodData.formUrl);
      setAddContact(!!applyMethodData.phoneNum);
    }
  }, [applyMethodData]);

  const experimentDateChecked =
    form.getValues('startDate') === null && form.getValues('endDate') === null;
  const durationChecked = form.getValues('timeRequired') === null;

  // todo 로딩 스피너 추가 + error 시 모달 띄우고 이전 페이지
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <FormProvider {...form}>
      <div className={uploadLayout}>
        <div>
          <h2 className={headerTitle}>실험에 대한 정보를 입력해 주세요</h2>
          <p className={headerSubTitle}>구체적일수록 참여자 매칭 확률이 높아져요</p>
        </div>

        <div className={uploadContentLayout}>
          <DescriptionSection images={images} setImages={setImages} />
          <OutlineSection
            experimentDateChecked={experimentDateChecked}
            durationChecked={durationChecked}
          />
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
            {form.formState.isSubmitting ? '공고 수정 중' : '공고 수정하기'}
          </button>
        </div>
      </div>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={openToast}
          onOpenChange={setOpenToast}
          duration={1500}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>공고 수정을 실패하였습니다.</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>

      <Dialog.Root open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content className={alertDialogContent}>
          <Dialog.Close asChild>
            <button className={closeButton} aria-label="모달 닫기" onClick={handleCloseDialog}>
              <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
            </button>
          </Dialog.Close>
          <Dialog.Title asChild>
            <>
              <Icon
                icon="BangRound"
                width={48}
                height={48}
                color={'rgba(246, 101, 112, 0.25)'}
                subcolor={colors.textAlert}
                aria-label="안내 아이콘"
              />
              <p className={alertDialogTitle}>공고를 불러오지 못했어요.</p>
            </>
          </Dialog.Title>
          <Dialog.Description>
            <p className={alertDialogDescription}>시간을 두고 다시 시도해주세요.</p>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </FormProvider>
  );
};

export default EditExperimentPost;
