import { LOGIN_PROVIDER, ROLE } from '@/constants/config';
import { GENDER } from '@/constants/user';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type LoginProvider = (typeof LOGIN_PROVIDER)[keyof typeof LOGIN_PROVIDER];

export type Gender = (typeof GENDER)[keyof typeof GENDER];
