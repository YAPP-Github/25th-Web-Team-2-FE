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
  });
};

export default useVerifyUnivAuthCodeMutation;
