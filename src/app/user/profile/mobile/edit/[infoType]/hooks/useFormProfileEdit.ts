import { useRouter } from 'next/navigation';

import { ParticipantResponse } from '@/apis/login';
import useFormParticipantUserInfo from '@/app/user/profile/hooks/useFormParticipantUserInfo';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/useToast';

const SUCCESS_UPDATE_MESSAGE = '저장되었어요';
const ERROR_UPDATE_MESSAGE = '저장에 실패했어요. 잠시 후에 다시 시도해 주세요.';

export const useFormProfileEdit = (userInfo: ParticipantResponse) => {
  const router = useRouter();
  const toast = useToast();
  const { form, handleSubmit, isLoading } = useFormParticipantUserInfo({
    userInfo,
  });

  const onSubmit = handleSubmit(
    async () => {
      router.replace(PATH.profile);
      toast.open({ message: SUCCESS_UPDATE_MESSAGE });
    },
    () => {
      toast.error({ message: ERROR_UPDATE_MESSAGE });
    },
  );

  return { form, isLoading, onSubmit };
};
