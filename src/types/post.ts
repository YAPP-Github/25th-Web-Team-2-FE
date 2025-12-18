import { TIME_REQUIRED } from '@/constants/config';

export interface ExperimentPost {
  postInfo: ExperimentPostInfo;
  recruitStatus: boolean;
}

export interface ExperimentPostInfo {
  experimentPostId: number;
  title: string;
  views: number;
  place: string | null;
  reward: string;
  durationInfo: {
    startDate: string | null;
    endDate: string | null;
  };
  timeRequired: TimeRequired | null;
  count: number | null;
}

export type TimeRequired = (typeof TIME_REQUIRED)[number];
