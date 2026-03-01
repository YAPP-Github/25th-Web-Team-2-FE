import { GENDER } from '../constants/filter';

export type GenderValue = (typeof GENDER)[number]['value'];

export type GenderFilterValue = (typeof GENDER)[number]['value'] | 'ALL';
