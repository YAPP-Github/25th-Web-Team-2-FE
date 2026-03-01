import { GENDER_TYPE } from '../constants/gender';

export type GenderType = (typeof GENDER_TYPE)[keyof typeof GENDER_TYPE];
