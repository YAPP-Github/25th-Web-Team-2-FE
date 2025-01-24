import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { convertLabelToValue } from '../upload.utils';

import UploadExperimentPostSchema, {
  UploadExperimentPostSchemaType,
} from '@/schema/upload/uploadExperimentPostSchema';
import useUploadExperimentPostAPI from '@/apis/hooks/useUploadExperimentPostAPI';

interface useUploadExperimentPostProps {
  addLink: boolean;
  addContact: boolean;
}

const useUploadExperimentPost = ({ addLink, addContact }: useUploadExperimentPostProps) => {
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

  /* 공고 등록 API */
  const { mutateAsync: uploadExperimentPost } = useUploadExperimentPostAPI();

  const handleSubmit = async (data: UploadExperimentPostSchemaType) => {
    const updatedData = {
      ...data,
      area: data.area ? convertLabelToValue(data.area) : undefined,
    };

    uploadExperimentPost(updatedData, {
      onSuccess: (response) => {
        form.reset();
        router.push(`/post/${response.postInfo.experimentPostId}`);
      },
      onError: (error) => {
        console.error('공고 등록 form 저장 중 오류 발생', error);
      },
    });
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};

export default useUploadExperimentPost;
