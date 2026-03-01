import { STEP } from '@/constants/steps';

export const VALIDATION_FIELDS_BY_STEP = {
  [STEP.description]: ['title', 'content'],

  [STEP.outline]: [
    'leadResearcher',
    'startDate',
    'endDate',
    'matchType',
    'place',
    'region',
    'area',
    'detailedAddress',
    'reward',
    'count',
    'timeRequired',
  ],

  [STEP.applyMethod]: ['applyMethodInfo', 'targetGroupInfo'],
} as const;
