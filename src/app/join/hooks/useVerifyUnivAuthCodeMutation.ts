import { verifyUnivAuthCode } from '@/apis/login';
import { useMutation } from '@tanstack/react-query';

interface VerifyParams {
  univEmail: string;
  inputCode: string;
}

const useVerifyUnivAuthCodeMutation = () => {
  return useMutation({
    mutationFn: ({ univEmail, inputCode }: VerifyParams) =>
      verifyUnivAuthCode(univEmail, inputCode),
    onSuccess: () => {
      // TODO: 토스트 메시지: 이메일 인증이 완료되었어요
    },
  });
};

export default useVerifyUnivAuthCodeMutation;
