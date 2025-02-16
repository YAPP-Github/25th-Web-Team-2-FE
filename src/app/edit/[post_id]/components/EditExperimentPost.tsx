'use client';

import * as Toast from '@radix-ui/react-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

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
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { colors } from '@/styles/colors';

const EditExperimentPost = ({ params }: { params: { post_id: string } }) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const router = useRouter();

  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [images, setImages] = useState<(File | string)[]>([]);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);

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
      setOpenAlertModal(true);
    }
  }, [isEdit, isError, setOpenAlertModal]);

  // 모달 닫을 때 이전 페이지로 이동
  const handleCloseModal = () => {
    setOpenAlertModal(false);
    router.back();
  };

  useEffect(() => {
    if (applyMethodData) {
      setAddLink(!!applyMethodData.formUrl);
      setAddContact(!!applyMethodData.phoneNum);
    }
  }, [applyMethodData]);

  // todo 로딩 스피너 추가
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  const experimentDateChecked =
    form.getValues('startDate') === null && form.getValues('endDate') === null;
  const durationChecked = form.getValues('timeRequired') === null;

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

      {/* 공고 불러오기 실패 시 모달 */}
      <AlertModal
        open={openAlertModal}
        onOpenChange={setOpenAlertModal}
        handleCloseModal={handleCloseModal}
        title="공고를 불러오지 못했어요."
        description="시간을 두고 다시 시도해주세요."
      />
    </FormProvider>
  );
};

export default EditExperimentPost;
