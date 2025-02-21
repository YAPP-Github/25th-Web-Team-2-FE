import { useMutation } from '@tanstack/react-query';

import { verifyUnivAuthCode } from '@/apis/login';

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
