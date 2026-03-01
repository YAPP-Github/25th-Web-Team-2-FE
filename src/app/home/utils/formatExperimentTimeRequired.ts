import { TimeRequired } from '@/types/post';

const TIME_REQUIRED_MAP: Record<TimeRequired, string> = {
  LESS_30M: '30분 이하',
  ABOUT_30M: '30분',
  ABOUT_1H: '1시간',
  ABOUT_1H30M: '1시간 30분',
  ABOUT_2H: '2시간',
  ABOUT_2H30M: '2시간 30분',
  ABOUT_3H: '3시간',
  ABOUT_3H30M: '3시간 30분',
  ABOUT_4H: '4시간',
};

export const formatExperimentTimeRequired = ({
  timeRequired,
  count,
}: {
  timeRequired: TimeRequired | null;
  count: number | null;
}): string[] => {
  const DEFAULT_TEXT = '본문 참고';
  const SEPARATOR = '|';

  if (!count) {
    return [DEFAULT_TEXT];
  }

  if (!timeRequired) {
    return [DEFAULT_TEXT, SEPARATOR, `${count}회`];
  }

  if (count === 1) {
    return [TIME_REQUIRED_MAP[timeRequired]];
  }

  return [TIME_REQUIRED_MAP[timeRequired], SEPARATOR, `${count}회`];
};
