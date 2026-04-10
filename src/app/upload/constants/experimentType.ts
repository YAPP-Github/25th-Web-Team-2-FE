import { TIME_REQUIRED } from '@constants/config';
import { MATCH_TYPE } from '@constants/filters';

export const EXPERIMENT_TYPE = {
  ONLINE_SURVEY: 'ONLINE_SURVEY',
  ONLINE_EXPERIMENT: 'ONLINE_EXPERIMENT',
  OFFLINE_EXPERIMENT: 'OFFLINE_EXPERIMENT',
  OTHER: 'OTHER',
} as const;

export type ExperimentType = (typeof EXPERIMENT_TYPE)[keyof typeof EXPERIMENT_TYPE];

type ExperimentTypeAutoInput = {
  matchType?: (typeof MATCH_TYPE)[keyof typeof MATCH_TYPE];
  count?: number;
  timeRequired?: (typeof TIME_REQUIRED)[number] | undefined;
  useDateReference?: boolean;
};

export const EXPERIMENT_TYPE_OPTIONS: { value: ExperimentType; label: string }[] = [
  { value: EXPERIMENT_TYPE.ONLINE_SURVEY, label: '온라인 설문조사' },
  { value: EXPERIMENT_TYPE.ONLINE_EXPERIMENT, label: '온라인 실험' },
  { value: EXPERIMENT_TYPE.OFFLINE_EXPERIMENT, label: '오프라인 실험' },
  { value: EXPERIMENT_TYPE.OTHER, label: '기타' },
];

export const EXPERIMENT_TYPE_UI_SCHEMA: Record<ExperimentType, ExperimentTypeAutoInput> = {
  [EXPERIMENT_TYPE.ONLINE_SURVEY]: {
    matchType: MATCH_TYPE.ONLINE,
    count: 1,
    timeRequired: 'LESS_30M',
    useDateReference: true,
  },
  [EXPERIMENT_TYPE.ONLINE_EXPERIMENT]: {
    matchType: MATCH_TYPE.ONLINE,
    count: 1,
    timeRequired: undefined,
    useDateReference: false,
  },
  [EXPERIMENT_TYPE.OFFLINE_EXPERIMENT]: {
    matchType: MATCH_TYPE.OFFLINE,
    count: 1,
    timeRequired: undefined,
    useDateReference: false,
  },
  [EXPERIMENT_TYPE.OTHER]: {},
};
