import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { convertLabelToValue, convertValueToLabel } from '../upload.utils';
import useUploadExperimentPostMutation from './useUploadExperimentPostMutation';
import useUploadImagesMutation from './useUploadImagesMutation';

import useEditExperimentPostMutation from '@/app/edit/[post_id]/hooks/useEditExperimentPostMutation';
import useOriginExperimentPostQuery from '@/app/edit/[post_id]/hooks/useOriginExperimentPostQuery';
import useApplyMethodQuery from '@/app/post/[post_id]/hooks/useApplyMethodQuery';
import UploadExperimentPostSchema, {
  UploadExperimentPostSchemaType,
} from '@/schema/upload/uploadExperimentPostSchema';
import { MatchType } from '@/types/uploadExperimentPost';

interface useUploadExperimentPostProps {
  isEdit: boolean;
  postId?: string;
  addLink: boolean;
  addContact: boolean;
  setOpenAlertModal: Dispatch<SetStateAction<boolean>>;
  setSuccessToast: Dispatch<SetStateAction<boolean>>;
  images: (File | string)[];
  setImages?: Dispatch<SetStateAction<(File | string)[]>>;
  setErrorMessage?: Dispatch<SetStateAction<string | null>>;
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
}: useUploadExperimentPostProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 기존 공고 데이터 불러오기
  const {
    data: experimentData,
    isLoading: isExperimentLoading,
    error: originExperimentError,
  } = useOriginExperimentPostQuery({
    postId: postId,
  });

  const { data: applyMethodData, isLoading: isApplyMethodLoading } = useApplyMethodQuery({
    postId: postId,
  });

  const form = useForm<UploadExperimentPostSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(UploadExperimentPostSchema({ addLink, addContact })),
    defaultValues: {
      leadResearcher: '',
      startDate: undefined,
      endDate: undefined,
      matchType: undefined,
      reward: '',
      place: undefined,
      detailedAddress: '',
      region: undefined,
      area: undefined,
      count: undefined,
      timeRequired: undefined,
      title: '',
      content: '',
      applyMethodInfo: {
        content: '',
        formUrl: null,
        phoneNum: null,
      },
      targetGroupInfo: {
        startAge: undefined,
        endAge: undefined,
        genderType: undefined,
        otherCondition: '',
      },
      imageListInfo: {
        images: [],
      },
      alarmAgree: false,
    },
  });

  // 기존 공고 데이터로 form reset
  useEffect(() => {
    if (isEdit && experimentData && applyMethodData) {
      setImages?.(experimentData.imageList);

      form.reset({
        leadResearcher: experimentData.summary.leadResearcher,
        startDate: experimentData.summary.startDate,
        endDate: experimentData.summary.endDate,
        matchType: experimentData.summary.matchType as MatchType,
        reward: experimentData.summary.reward,
        place: experimentData.address.place,
        detailedAddress: experimentData.address.detailedAddress,
        region: experimentData.address.region,
        area: convertValueToLabel(experimentData.address.area),
        count: experimentData.summary.count,
        timeRequired: experimentData.summary.timeRequired as
          | 'LESS_30M'
          | 'ABOUT_30M'
          | 'ABOUT_1H'
          | 'ABOUT_1H30M'
          | 'ABOUT_2H'
          | 'ABOUT_2H30M'
          | 'ABOUT_3H'
          | 'ABOUT_3H30M'
          | 'ABOUT_4H'
          | null
          | undefined,
        title: experimentData.title,
        content: experimentData.content,
        applyMethodInfo: {
          content: applyMethodData.content,
          formUrl: applyMethodData.formUrl,
          phoneNum: applyMethodData.phoneNum,
        },
        targetGroupInfo: {
          startAge: experimentData.targetGroup.startAge ?? undefined,
          endAge: experimentData.targetGroup.endAge ?? undefined,
          genderType: experimentData.targetGroup.genderType,
          otherCondition: experimentData.targetGroup.otherCondition || '',
        },
        imageListInfo: {
          images: experimentData.imageList,
        },
        alarmAgree: experimentData.alarmAgree,
      });
    }
  }, [isEdit, experimentData, applyMethodData, form, setImages]);

  const { mutateAsync: uploadImageMutation } = useUploadImagesMutation();
  const { mutateAsync: uploadExperimentPost } = useUploadExperimentPostMutation();
  const { mutateAsync: editExperimentPost } = useEditExperimentPostMutation();

  const handleSubmit = async (data: UploadExperimentPostSchemaType) => {
    let updatedImages: (string | File)[] = [...images];

    const newFiles = images.filter((image) => image instanceof File) as File[];

    if (newFiles.length > 0) {
      const uploadedFiles = await Promise.all(
        newFiles.map(async (file) => {
          const originalUrl = await uploadImageMutation(file);
          return originalUrl;
        }),
      );

      let fileIndex = 0;
      updatedImages = updatedImages.map((image) => {
        if (image instanceof File) {
          const uploadedUrl = uploadedFiles[fileIndex];
          fileIndex++;
          return uploadedUrl;
        }
        return image;
      });
    }

    const updatedData = {
      ...data,
      area: data.area ? convertLabelToValue(data.area) : null,
      imageListInfo: {
        images: updatedImages as string[],
      },
      place: data.matchType === MatchType.ONLINE ? null : data.place,
    };

    if (isEdit && postId) {
      await editExperimentPost(
        { postId, data: updatedData },
        {
          onSuccess: async () => {
            await Promise.allSettled([
              queryClient.invalidateQueries({ queryKey: ['experimentPostDetail', postId] }),
              queryClient.invalidateQueries({ queryKey: ['applyMethod', postId] }),
            ]);

            setSuccessToast(true);
            setTimeout(() => {
              router.push(`/post/${postId}`);
            }, 1000);
            form.reset();
          },
          onError: (error) => {
            setErrorMessage?.(error.message);
            setOpenAlertModal(true);
          },
        },
      );
    } else {
      uploadExperimentPost(updatedData, {
        onSuccess: (response) => {
          setSuccessToast(true);
          setTimeout(() => {
            router.push(`/post/${response.postInfo.experimentPostId}`);
          }, 1000);
          form.reset();
        },
        onError: (error) => {
          setErrorMessage?.(error.message);
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
    isAuthor: experimentData?.isAuthor ?? false,
    isRecruitStatus: experimentData?.recruitStatus ?? true,
    originExperimentError,
  };
};

export default useManageExperimentPostForm;
