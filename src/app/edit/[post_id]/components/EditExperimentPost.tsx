'use client';

import * as Toast from '@radix-ui/react-toast';
import Link from 'next/link';
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
} from '@/app/upload/components/UploadContainer/UploadContainer.css';
import useManageExperimentPostForm from '@/app/upload/hooks/useManageExperimentPostForm';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const EditExperimentPost = ({ params }: { params: { post_id: string } }) => {
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState(false);
  const [images, setImages] = useState<(File | string)[]>([]);

  const { form, handleSubmit, isLoading, applyMethodData } = useManageExperimentPostForm({
    isEdit: true,
    postId: params.post_id,
    addLink,
    addContact,
    setOpenToast,
    images,
  });

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
        <OutlineSection
          experimentDateChecked={experimentDateChecked}
          durationChecked={durationChecked}
        />
        <DescriptionSection images={images} setImages={setImages} />
        <ApplyMethodSection
          addLink={addLink}
          setAddLink={setAddLink}
          addContact={addContact}
          setAddContact={setAddContact}
        />

        {/* 버튼 */}
        <div className={buttonContainer}>
          <Link href={'/'}>
            <button className={buttonVariants.active}>이전으로</button>
          </Link>
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
    </FormProvider>
  );
};

export default EditExperimentPost;
