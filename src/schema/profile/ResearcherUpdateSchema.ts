import { z } from 'zod';

export type ResearcherUpdateSchemaType = z.infer<ReturnType<typeof ResearcherUpdateSchema>>;
export type ResearcherUpdateSubmitSchemaType = z.infer<
  ReturnType<typeof ResearcherUpdateSubmitSchema>
>;

const requiredFields = {
  // 연락받을 이메일: 필수. 한글X. 이메일 형식.
  contactEmail: z
    .string({
      required_error: '연락 받을 이메일을 입력해주세요',
    })
    .email({ message: '이메일 형식이 올바르지 않아요' }),

  // 이름: 필수. 2자 이상 10자 이하. 한글, 영문만 입력.
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .regex(/^[a-zA-Z가-힣]+$/, { message: '한글과 영문만 입력 가능합니다' })
    .min(2, { message: '최소 2자 이상으로 입력해 주세요' })
    .max(10, { message: '최대 10자 이하로 입력해 주세요' }),

  // 학교: 필수. 2자 이상 25자 이하.
  univName: z
    .string({ required_error: '학교명을 입력해주세요' })
    .regex(/^[a-zA-Z가-힣]+$/, { message: '한글과 영문만 입력 가능합니다' })
    .min(2, { message: '최소 2자 이상으로 입력해 주세요' })
    .max(25, { message: '최대 25자 이하로 입력해 주세요' }),

  // 학과: 필수. 3자 이상 10자 이하.
  major: z
    .string({ required_error: '학과를 입력해주세요' })
    .regex(/^[a-zA-Z가-힣]+$/, { message: '한글과 영문만 입력 가능합니다' })
    .min(3, { message: '최소 3자 이상으로 입력해 주세요' })
    .max(10, { message: '최대 10자 이하로 입력해 주세요' }),

  // 랩실정보: 선택. 100자 이하. 입력 막기x.
  labInfo: z.string().max(100, { message: '최대 100자 이하로 입력해 주세요' }).optional(),

  // 이메일 수신 동의 체크 여부.
  adConsent: z.boolean(),
};

export const ResearcherUpdateSubmitSchema = () => {
  return z.object(requiredFields);
};

export const ResearcherUpdateSchema = () => {
  return z.object({
    ...requiredFields,
    verifiedContactEmail: z.string(),
  });
};
