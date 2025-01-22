import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import UploadExperimentPostSchema, {
  UploadExperimentPostSchemaType,
} from '@/schema/upload/uploadExperimentPostSchema';

const useUploadExperimentPost = () => {
  const form = useForm<UploadExperimentPostSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(UploadExperimentPostSchema()),
    defaultValues: {
      leadResearcher: '',
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleSubmit = async (data: UploadExperimentPostSchemaType) => {
    try {
      //   console.log('공고 등록 form >> ', data);

      await form.reset();
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
