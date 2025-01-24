import { useMutation } from '@tanstack/react-query';

import { sendUnivAuthCode } from '@/apis/login';

// TODO: 이미 인증된 메일일 경우 에러 처리
const useSendUnivAuthCodeMutation = () => {
  return useMutation({
    mutationFn: sendUnivAuthCode,
  });
};

export default useSendUnivAuthCodeMutation;
