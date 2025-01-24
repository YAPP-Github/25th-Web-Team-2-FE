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
