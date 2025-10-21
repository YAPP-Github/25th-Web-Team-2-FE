import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { convertLabelToValue, transformOriginFormData, uploadImages } from '../upload.utils';
import useUploadExperimentPostMutation from './useUploadExperimentPostMutation';
import useUploadImagesMutation from './useUploadImagesMutation';
import { EXPERIMENT_POST_DEFAULT_VALUES } from '../upload.constants';
import useExtractKeywordsMutation from './useExtractKeywords';

import useEditExperimentPostMutation from '@/app/edit/[postId]/hooks/useEditExperimentPostMutation';
import useOriginExperimentPostQuery from '@/app/edit/[postId]/hooks/useOriginExperimentPostQuery';
import revalidateExperimentPosts from '@/app/post/[postId]/actions';
import { MATCH_TYPE } from '@/app/post/[postId]/ExperimentPostPage.types';
import useApplyMethodQuery from '@/app/post/[postId]/hooks/useApplyMethodQuery';
import { queryKey } from '@/constants/queryKey';
import UploadExperimentPostSchema, {
  UploadExperimentPostSchemaType,
} from '@/schema/upload/uploadExperimentPostSchema';

interface useUploadExperimentPostProps {
  isEdit: boolean;
  postId?: string;
  addLink: boolean;
  addContact: boolean;
  setOpenAlertModal: Dispatch<SetStateAction<boolean>>;
  setSuccessToast: Dispatch<SetStateAction<boolean>>;
  images: (File | string)[];
  setImages?: Dispatch<SetStateAction<(File | string)[]>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;

  setAddLink: Dispatch<SetStateAction<boolean>>;
  setAddContact: Dispatch<SetStateAction<boolean>>;
}

const useManageExperimentPostForm = ({
  isEdit,
  postId,
  addLink,
  addContact,
  setOpenAlertModal,
  setSuccessToast,
  images,
  setImages,
  setErrorMessage,
  setAddLink,
  setAddContact,
}: useUploadExperimentPostProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: uploadImageMutation } = useUploadImagesMutation();
  const { mutateAsync: uploadExperimentPost } = useUploadExperimentPostMutation();
  const { mutateAsync: editExperimentPost } = useEditExperimentPostMutation();
  const { mutateAsync: extractKeywords } = useExtractKeywordsMutation();

  // 기존 공고 데이터 불러오기
  const {
    data: originExperimentData,
    isLoading: isExperimentLoading,
    error: originExperimentError,
  } = useOriginExperimentPostQuery({
    postId: postId,
  });

  // 참여 방법 불러오기
  const { data: applyMethodData, isLoading: isApplyMethodLoading } = useApplyMethodQuery({
    postId: postId,
  });

  // 기존 공고 데이터 Form 형식으로 포맷
  const originFormData = useMemo(() => {
    if (!originExperimentData || !applyMethodData) return undefined;
    return transformOriginFormData(originExperimentData, applyMethodData);
  }, [originExperimentData, applyMethodData]);

  // 공고 form
  const form = useForm<UploadExperimentPostSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(UploadExperimentPostSchema({ addLink, addContact })),
    defaultValues: EXPERIMENT_POST_DEFAULT_VALUES,
  });
  useEffect(() => {
    if (!setErrorMessage) return;
    if (originExperimentError) {
      const errorMessage = originExperimentError.message;
      setErrorMessage(errorMessage);
    }
  }, [originExperimentError, setErrorMessage]);

  // 기존 공고 데이터로 form reset
  useEffect(() => {
    if (isEdit && originFormData) {
      setImages?.(originFormData.imageListInfo.images as (string | File)[]);
      form.reset(originFormData);
    }
  }, [isEdit, originFormData, form, setImages]);

  /* 키워드 추출 */
  console.log('form >> ', form.getValues());

  const extractKeywordsFromContent = async () => {
    try {
      const content = form.getValues('content');
      const response = await extractKeywords(content);
      const keywords = response.experimentPostKeywords;

      //  단일 필드
      if (keywords.reward) {
        form.setValue('reward', keywords.reward);
      }
      if (keywords.matchType) {
        form.setValue('matchType', keywords.matchType);
      }
      if (keywords.timeRequired) {
        form.setValue('timeRequired', keywords.timeRequired);
      }
      if (keywords.count) {
        form.setValue('count', keywords.count);
      }

      //  중첩된 필드: applyMethod
      if (keywords.applyMethod) {
        form.setValue('applyMethodInfo.content', keywords.applyMethod.content);
        if (keywords.applyMethod.isFormUrl && keywords.applyMethod.formUrl) {
          setAddLink(true);
          form.setValue('applyMethodInfo.formUrl', keywords.applyMethod.formUrl);
        }
        if (keywords.applyMethod.isPhoneNum && keywords.applyMethod.phoneNum) {
          setAddContact(true);
          form.setValue('applyMethodInfo.phoneNum', keywords.applyMethod.phoneNum);
        }
      }

      //  중첩된 필드: targetGroup
      if (keywords.targetGroup) {
        form.setValue('targetGroupInfo.startAge', keywords.targetGroup.startAge);
        form.setValue('targetGroupInfo.endAge', keywords.targetGroup.endAge);
        form.setValue('targetGroupInfo.genderType', keywords.targetGroup.genderType);
        if (keywords.targetGroup.otherCondition) {
          form.setValue('targetGroupInfo.otherCondition', keywords.targetGroup.otherCondition);
        }
      }
    } catch (error) {
      console.error('키워드 추출 실패:', error);
    }
  };

  const handleSubmit = async (data: UploadExperimentPostSchemaType) => {
    /* 이미지 먼저 등록 */
    const updatedImages = await uploadImages(images, uploadImageMutation);

    /* 최종 공고 FormData */
    const updatedData = {
      ...data,
      area: data.area ? convertLabelToValue(data.area) : null,
      imageListInfo: {
        images: updatedImages as string[],
      },
      place: data.matchType === MATCH_TYPE.ONLINE ? null : data.place,
    };

    if (isEdit && postId) {
      await editExperimentPost(
        { postId, data: updatedData },
        {
          onSuccess: async () => {
            setSuccessToast(true);

            await Promise.allSettled([
              queryClient.invalidateQueries({ queryKey: queryKey.experimentPostDetail(postId) }),
              queryClient.invalidateQueries({ queryKey: queryKey.applyMethod(postId) }),
              revalidateExperimentPosts(),
            ]);

            setTimeout(() => {
              router.push(`/post/${postId}`);
            }, 1000);
            form.reset();
          },
          onError: (error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            setOpenAlertModal(true);
          },
        },
      );
    } else {
      uploadExperimentPost(updatedData, {
        onSuccess: async (response) => {
          setSuccessToast(true);
          await revalidateExperimentPosts();
          setTimeout(() => {
            router.push(`/post/${response.postInfo.experimentPostId}`);
          }, 1000);
          form.reset();
        },
        onError: (error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          setOpenAlertModal(true);
        },
      });
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading: isExperimentLoading || isApplyMethodLoading,
    applyMethodData,
    isAuthor: originExperimentData?.isAuthor ?? false,
    isRecruitStatus: originExperimentData?.recruitStatus ?? true,
    originExperimentError,

    originFormData,

    //
    extractKeywordsFromContent,
  };
};

export default useManageExperimentPostForm;
