import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import UploadExperimentPostSchema, {
  UploadExperimentPostSchemaType,
} from '@/schema/upload/uploadExperimentPostSchema';

const useUploadExperimentPost = () => {
  const form = useForm<UploadExperimentPostSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: async (data, context, options) => {
      const matchType = data.matchType;
      const schema = UploadExperimentPostSchema({ matchType });
      return zodResolver(schema)(data, context, options);
    },
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
      },
    },
  });

  const handleSubmit = async (data: UploadExperimentPostSchemaType) => {
    try {
      console.log('공고 등록 form >> ', data);
      // todo region label이 아닌 value로 변경 필요

      await form.reset({
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
      });
    } catch (error) {
      //   console.error('공고 등록 form 저장 중 오류 발생', error);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};

export default useUploadExperimentPost;
