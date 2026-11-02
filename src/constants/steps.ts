export const STEP = {
  // 회원가입
  email: 'email',
  contactEmail: 'contactEmail',
  univEmail: 'univEmail',
  info: 'info',
  additionalInfo: 'additionalInfo',

  // 공고 등록
  description: 'description',
  outline: 'outline',
  applyMethod: 'applyMethod',

  success: 'success',
} as const;

export const UPLOAD_STEP_LIST = [
  STEP.description,
  STEP.outline,
  STEP.applyMethod,
  STEP.success,
] as const;
