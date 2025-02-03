import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { convertLabelToValue } from '../upload.utils';
import useUploadExperimentPostMutation from './useUploadExperimentPostMutation';
import useUploadImagesMutation from './useUploadImagesMutation';

import UploadExperimentPostSchema, {
  UploadExperimentPostSchemaType,
} from '@/schema/upload/uploadExperimentPostSchema';

interface useUploadExperimentPostProps {
  addLink: boolean;
  addContact: boolean;
  setOpenToast: Dispatch<SetStateAction<boolean>>;
  selectedImages: File[];
}

const useManageExperimentPostForm = ({
  addLink,
  addContact,
  setOpenToast,
  selectedImages,
}: useUploadExperimentPostProps) => {
  const router = useRouter();

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
      univName: undefined,
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

  const { mutateAsync: uploadImageMutation } = useUploadImagesMutation();
  const { mutateAsync: uploadExperimentPost } = useUploadExperimentPostMutation();

  const handleSubmit = async (data: UploadExperimentPostSchemaType) => {
    /* 이미지 등록 먼저 */
    let uploadedImageUrls: string[] = [];

    if (selectedImages.length > 0) {
      uploadedImageUrls = await Promise.all(
        selectedImages.map(async (image) => {
          const url = await uploadImageMutation(image);
          return url;
        }),
      );
    }

    const updatedData = {
      ...data,
      area: data.area ? convertLabelToValue(data.area) : undefined,
      imageListInfo: {
        images: uploadedImageUrls,
      },
    };

    /* 공고 등록 */
    uploadExperimentPost(updatedData, {
      onSuccess: (response) => {
        form.reset();
        router.push(`/post/${response.postInfo.experimentPostId}`);
      },
      onError: () => {
        setOpenToast(true);
      },
    });
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};

export default useManageExperimentPostForm;
