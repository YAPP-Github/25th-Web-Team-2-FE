import { TimeRequired } from '@/types/post';
import { MATCH_TYPE } from '@constants/filters';

export const EXPERIMENT_TYPE = {
  ONLINE_SURVEY: 'ONLINE_SURVEY',
  ONLINE_EXPERIMENT: 'ONLINE_EXPERIMENT',
  OFFLINE_EXPERIMENT: 'OFFLINE_EXPERIMENT',
  OTHER: 'OTHER',
} as const;

export type ExperimentType = (typeof EXPERIMENT_TYPE)[keyof typeof EXPERIMENT_TYPE];

type ExperimentPresetMap = {
  [EXPERIMENT_TYPE.ONLINE_SURVEY]: {
    matchType: typeof MATCH_TYPE.ONLINE;
    count: number;
    timeRequired: TimeRequired;
    useDateReference: true;
  };

  [EXPERIMENT_TYPE.ONLINE_EXPERIMENT]: {
    matchType: typeof MATCH_TYPE.ONLINE;
    count: number;
    useDateReference: false;
    timeRequired: null;
  };

  [EXPERIMENT_TYPE.OFFLINE_EXPERIMENT]: {
    matchType: typeof MATCH_TYPE.OFFLINE;
    count: number;
    useDateReference: false;
    timeRequired: null;
  };

  [EXPERIMENT_TYPE.OTHER]: {
    matchType?: never;
    count?: never;
    timeRequired: null;
    useDateReference?: never;
  };
};

export const EXPERIMENT_TYPE_OPTIONS: { value: ExperimentType; label: string }[] = [
  { value: EXPERIMENT_TYPE.ONLINE_SURVEY, label: '온라인 설문조사' },
  { value: EXPERIMENT_TYPE.ONLINE_EXPERIMENT, label: '온라인 실험' },
  { value: EXPERIMENT_TYPE.OFFLINE_EXPERIMENT, label: '오프라인 실험' },
  { value: EXPERIMENT_TYPE.OTHER, label: '기타' },
];

export const EXPERIMENT_TYPE_UI_SCHEMA = {
  [EXPERIMENT_TYPE.ONLINE_SURVEY]: {
    matchType: MATCH_TYPE.ONLINE,
    count: 1,
    timeRequired: 'LESS_30M',
    useDateReference: true,
  },
  [EXPERIMENT_TYPE.ONLINE_EXPERIMENT]: {
    matchType: MATCH_TYPE.ONLINE,
    count: 1,
    timeRequired: null,
    useDateReference: false,
  },
  [EXPERIMENT_TYPE.OFFLINE_EXPERIMENT]: {
    matchType: MATCH_TYPE.OFFLINE,
    count: 1,
    timeRequired: null,
    useDateReference: false,
  },
  [EXPERIMENT_TYPE.OTHER]: {
    matchType: undefined,
    count: undefined,
    timeRequired: null,
    useDateReference: undefined,
  },
} as const satisfies ExperimentPresetMap;
