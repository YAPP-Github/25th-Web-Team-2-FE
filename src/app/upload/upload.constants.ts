import { STEP } from '../join/JoinPage.constants';

export const countSelectOptions = [
  {
    label: '1회',
    value: '1',
  },
  {
    label: '2회',
    value: '2',
  },
  {
    label: '3회',
    value: '3',
  },
  {
    label: '4회',
    value: '4',
  },
  {
    label: '5회',
    value: '5',
  },
  {
    label: '6회',
    value: '6',
  },
  {
    label: '7회',
    value: '7',
  },
  {
    label: '8회',
    value: '8',
  },
  {
    label: '9회',
    value: '9',
  },
  {
    label: '10회',
    value: '10',
  },
];

export const durationMinutesOptions = [
  { label: '30분 미만', value: 'LESS_30M' },
  { label: '약 30분', value: 'ABOUT_30M' },
  { label: '약 1시간', value: 'ABOUT_1H' },
  { label: '약 1시간 30분', value: 'ABOUT_1H30M' },
  { label: '약 2시간', value: 'ABOUT_2H' },
  { label: '약 2시간 30분', value: 'ABOUT_2H30M' },
  { label: '약 3시간', value: 'ABOUT_3H' },
  { label: '약 3시간 30분', value: 'ABOUT_3H30M' },
  { label: '약 4시간', value: 'ABOUT_4H' },
];

export const EXPERIMENT_POST_DEFAULT_VALUES = {
  leadResearcher: '',
  startDate: undefined,
  endDate: undefined,
  matchType: undefined,
  reward: '',
  place: '',
  detailedAddress: '',
  region: undefined,
  area: undefined,
  count: undefined,
  timeRequired: undefined,
  title: '',
  content: '',
  applyMethodInfo: {
    content: '',
    formUrl: null,
    phoneNum: null,
  },
  targetGroupInfo: {
    startAge: undefined,
    endAge: undefined,
    genderType: undefined,
    otherCondition: '',
  },
  imageListInfo: {
    images: [],
  },
  alarmAgree: false,
  isOnCampus: true,
  addLink: false,
  addContact: false,
};

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
