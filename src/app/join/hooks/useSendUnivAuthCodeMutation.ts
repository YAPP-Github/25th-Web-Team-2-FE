import { useMutation } from '@tanstack/react-query';

import { CustomError } from '@/apis/config/error';
import { sendUnivAuthCode, UnivAuthCodeResponse } from '@/apis/login';

const useSendUnivAuthCodeMutation = () => {
  return useMutation<UnivAuthCodeResponse, CustomError, string>({
    mutationFn: sendUnivAuthCode,
  });
};

export default useSendUnivAuthCodeMutation;
