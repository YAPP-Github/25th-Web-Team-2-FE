import { ERROR_MESSAGES } from '@/apis/config/constants';
import { CustomError } from '@/apis/config/error';

const existAccountRoleMapper: Record<string, string> = {
  RESEARCHER: '참여자',
  PARTICIPANT: '연구자',
};

export const getAuthErrorMessage = (role: string, error: CustomError) => {
  const alreadyJoinedMessage = `${existAccountRoleMapper[role]}로 ${ERROR_MESSAGES[error.code]}`;
  const message = error.code === 'ME0002' ? alreadyJoinedMessage : error.message;
  const errorMessage = message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';

  return errorMessage;
};
