export const formatExperimentCount = (count: number | null) =>
  count === 10 ? '10회 이상' : `${count}회`;
