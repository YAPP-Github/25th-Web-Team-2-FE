import { useRouter } from 'next/navigation';

import { ResearcherResponse } from '@/apis/login';
import useFormResearcherUserInfo from '@/app/user/profile/hooks/useFormResearcherUserInfo';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/useToast';

const SUCCESS_UPDATE_MESSAGE = '저장되었어요';
const ERROR_UPDATE_MESSAGE = '저장에 실패했어요. 잠시 후에 다시 시도해 주세요.';

export const useFormResearcherProfileEdit = (userInfo: ResearcherResponse) => {
  const router = useRouter();
  const toast = useToast();
  const { form, handleSubmit, isLoading } = useFormResearcherUserInfo({
    userInfo,
  });

  const onSubmit = handleSubmit(
    async () => {
      router.replace(`${PATH.profile}?tab=profile`);
      toast.open({ message: SUCCESS_UPDATE_MESSAGE });
    },
    () => {
      toast.error({ message: ERROR_UPDATE_MESSAGE });
    },
  );

  return { form, isLoading, onSubmit };
};
