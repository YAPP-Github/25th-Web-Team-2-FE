import { sendUnivAuthCode } from '@/apis/login';
import { useMutation } from '@tanstack/react-query';

// TODO: 이미 인증된 메일일 경우 에러 처리
const useSendUnivAuthCodeMutation = () => {
  return useMutation({
    mutationFn: sendUnivAuthCode,
  });
};

export default useSendUnivAuthCodeMutation;
