import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { isParticipantInfo } from '@/utils/typeGuard';

export const formatPostDate = ({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}) => {
  const format = (date: string) =>
    new Date(date).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });

  // 둘 다 있는 경우
  if (startDate && endDate) {
    return `${format(startDate)} ~ ${format(endDate)}`;
  }

  // 둘 다 없는 경우
  else if (!startDate && !endDate) {
    return '공고 참고';
  }

  // 시작일자만 있는 경우
  else if (startDate && !endDate) {
    return format(startDate);
  }

  // 마감일자만 있는 경우
  else if (!startDate && endDate) {
    return format(endDate);
  }
};

export const filterParticipantInfo = (data?: ParticipantResponse | ResearcherResponse) => {
  if (data && isParticipantInfo(data)) {
    return data;
  }

  return null;
};

export const calculateAgeFromBirthDate = (birthDate?: string) => {
  if (!birthDate) return;

  const today = new Date();
  const date = new Date(birthDate);
  const age = today.getFullYear() - date.getFullYear();
  return age;
};
