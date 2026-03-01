import { LOGIN_PROVIDER, ROLE } from '@/constants/config';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type LoginProvider = (typeof LOGIN_PROVIDER)[keyof typeof LOGIN_PROVIDER];
