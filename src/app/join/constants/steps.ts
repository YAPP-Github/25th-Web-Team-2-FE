import { STEP } from '@/constants/steps';

export const DESKTOP_PARTICIPANT_JOIN_STEP_LIST = [STEP.email, STEP.info, STEP.success] as const;
export const DESKTOP_RESEARCHER_JOIN_STEP_LIST = [STEP.email, STEP.info, STEP.success] as const;

export const MOBILE_PARTICIPANT_JOIN_STEP_LIST = [
  STEP.contactEmail,
  STEP.info,
  STEP.additionalInfo,
  STEP.success,
] as const;

export const MOBILE_RESEARCHER_JOIN_STEP_LIST = [
  STEP.contactEmail,
  STEP.univEmail,
  STEP.info,
  STEP.success,
] as const;
