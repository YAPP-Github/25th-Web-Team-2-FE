import { z } from 'zod';

export type ParticipantJoinSchemaType = z.infer<ReturnType<typeof ParticipantJoinSchema>>;
export type ParticipantJoinSubmitSchemaType = z.infer<
  ReturnType<typeof ParticipantJoinSubmitSchema>
>;

const requiredFields = {
  // 소셜 로그인 아이디: 필수. 유저 수정 불가.
  oauthEmail: z
    .string({ required_error: '소셜 로그인 정보가 없습니다' })
    .email({ message: '이메일 형식이 올바르지 않아요' }),

  // 소셜 로그인 도메인
  provider: z.union([
    z.literal('GOOGLE', { message: '유효한 도메인이 아닙니다' }),
    z.literal('NAVER'),
  ]),

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

  // 성별. 필수. 남자/여자/선택안함
  gender: z.union([
    z.literal('MALE', { message: '성별을 선택해주세요' }),
    z.literal('FEMALE'),
    z.literal('ALL'),
  ]),

  // 생년월일. 필수. yyyy.mm.dd
  birthDate: z
    .string({
      required_error: '생년월일을 입력해주세요',
    })
    .regex(/^\d{4}\.\d{2}\.\d{2}$/, { message: 'YYYY.MM.DD 형식으로 입력해주세요' })
    .refine(
      (value) => {
        const [year, month, day] = value.split('.').map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day
        );
      },
      { message: '유효한 날짜를 입력해주세요' },
    ),

  // 거주 지역. 필수. 시.도(region), 시.군.구(area)
  basicAddressInfo: z.object(
    {
      region: z
        .string({
          required_error: '거주 지역의 시·도를 입력해주세요',
        })
        .min(1),
      area: z
        .string({
          required_error: '거주 지역의 시·군·구를 입력해주세요',
        })
        .min(1),
    },
    { required_error: '거주 지역을 입력해주세요' },
  ),

  // 추가 활동 지역. 선택. 시.도(region), 시.군.구(area)
  additionalAddressInfo: z
    .object({
      region: z.string().optional(),
      area: z.string().optional(),
    })
    .nullable()
    .refine(
      (data) => {
        // region에 값이 있을 경우, area도 선택해야함
        if (data?.region) {
          return !!data.area;
        }

        return true;
      },
      {
        message: '추가 활동 지역의 시·군·구를 선택해주세요',
        path: ['area'],
      },
    ),

  // 선호 실험 진행 방식. 선택. 대면/비대면/전체
  matchType: z.union([z.literal('OFFLINE'), z.literal('ONLINE'), z.literal('ALL')]).optional(),

  // 이메일 수신 동의 여부.
  adConsent: z.boolean(),

  // 매칭 이메일 수신 동의 여부.
  matchConsent: z.boolean(),
};

export const ParticipantJoinSubmitSchema = () => {
  return z.object(requiredFields);
};

export const ParticipantJoinSchema = () => {
  return z.object({
    ...requiredFields,
    verifiedContactEmail: z.string(),
    isTermOfService: z.boolean(), // 이용약관 동의 여부
    isPrivacy: z.boolean(), // 개인정보 처리 동의 여부
  });
};
