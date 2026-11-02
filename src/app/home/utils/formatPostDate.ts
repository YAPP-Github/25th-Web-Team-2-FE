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

  if (startDate && endDate) {
    return `${format(startDate)} ~ ${format(endDate)}`;
  }
  if (!startDate && !endDate) {
    return '공고 참고';
  }
  if (startDate && !endDate) {
    return format(startDate);
  }
  if (!startDate && endDate) {
    return format(endDate);
  }
};
