import { GENDER } from '../home.constants';

export type GenderValue = (typeof GENDER)[number]['value'];

export type GenderFilterValue = (typeof GENDER)[number]['value'] | 'ALL';
