import { ROLE } from '@/constants/config';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type LoginProvider = 'GOOGLE' | 'NAVER';
