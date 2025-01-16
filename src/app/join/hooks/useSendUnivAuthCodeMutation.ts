import { sendUnivAuthCode } from '@/apis/login';
import { useMutation } from '@tanstack/react-query';

// TODO: 이미 인증된 메일일 경우 에러 처리
const useSendUnivAuthCodeMutation = () => {
  return useMutation({
    mutationFn: sendUnivAuthCode,
    onSuccess: () => {
      // TODO: 토스트 메시지: 인증번호가 발송되었어요
    },
  });
};

export default useSendUnivAuthCodeMutation;
