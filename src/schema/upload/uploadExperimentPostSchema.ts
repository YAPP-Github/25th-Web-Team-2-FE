import { z } from 'zod';

import { GENDER_TYPE, MATCH_TYPE } from '@/app/post/[postId]/ExperimentPostPage.types';

const UploadExperimentPostFormSchema = () => {
  return z.object({
    // 실험 시작 날짜
    startDate: z.union([z.string(), z.null()]),

    // 실험 종료 날짜
    endDate: z.union([z.string(), z.null()]),

    // 진행 방식
    matchType: z.enum([MATCH_TYPE.OFFLINE, MATCH_TYPE.ONLINE, MATCH_TYPE.ALL]),

    // 실험 횟수
    count: z.preprocess(
      (val) => (typeof val === 'number' ? String(val) : val), // 숫자 → 문자열 변환
      z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']).transform(Number), // 문자열 → 숫자 변환
    ),

    // 소요 시간
    timeRequired: z
      .enum([
        'LESS_30M',
        'ABOUT_30M',
        'ABOUT_1H',
        'ABOUT_1H30M',
        'ABOUT_2H',
        'ABOUT_2H30M',
        'ABOUT_3H',
        'ABOUT_3H30M',
        'ABOUT_4H',
      ])
      .nullable(),

    // 연구 책임자
    leadResearcher: z
      .string()
      .min(5, { message: '최소 5자 이상으로 입력해 주세요' })
      .max(150, { message: '최대 150자 이하로 입력해 주세요' }),

    // 학교명
    place: z.string().nullable(),

    // 지역
    region: z.string().min(1, '').nullable(),

    // 지역구
    area: z.string().min(1, '').nullable(),

    // 상세 주소. 비대면 또는 교내실험이면 옵셔널, 교내실험이 아니라면 필수값.
    detailedAddress: z.string().max(70, '최대 70자 이하로 입력해 주세요').nullable(),

    // 보상
    reward: z
      .string({ message: '최소 1자 이상으로 입력해 주세요' })
      .min(1, { message: '최소 1자 이상으로 입력해 주세요' })
      .max(170, { message: '최대 170자 이하로 입력해 주세요' }),

    // 실험 제목
    title: z
      .string()
      .min(5, '최소 5자 이상으로 입력해 주세요')
      .max(150, '최대 150자 이하로 입력해 주세요'),

    // 실험 본문
    content: z
      .string()
      .min(10, '최소 10자 이상으로 입력해 주세요')
      .max(5000, '최대 5000자 이하로 입력해 주세요'),

    imageListInfo: z.object({
      images: z.array(z.string()).optional(), // 이미지 목록 (최대 3장)
    }),

    applyMethodInfo: z.object({
      // 참여 방법
      content: z
        .string()
        .min(5, '최소 5자 이상으로 입력해 주세요')
        .max(200, '최대 200자 이하로 입력해 주세요'),

      // 링크
      formUrl: z
        .string()
        .max(100, '최대 100자 이하로 입력해 주세요')
        .url({ message: 'URL 형식에 맞춰 입력해 주세요' })
        .nullable(),

      // 연락처
      phoneNum: z.string().max(50, '최대 50자 이하로 입력해 주세요').nullable(),
    }),
    targetGroupInfo: z.object({
      startAge: z.coerce
        .number({ message: '' })
        .min(0, { message: '0세 이상이어야 합니다' })
        .max(100, { message: '100세 이하로 입력해주세요' }),
      endAge: z.coerce
        .number({ message: '' })
        .min(0, { message: '0세 이상이어야 합니다' })
        .max(100, { message: '100세 이하로 입력해주세요' }),

      genderType: z.enum([GENDER_TYPE.MALE, GENDER_TYPE.FEMALE, GENDER_TYPE.ALL]),

      otherCondition: z.string().max(300, '최대 300자 이하로 입력해 주세요').optional(), // 기타조건
    }),

    // 알람 동의
    alarmAgree: z.boolean().default(false),

    // 교내 실험 여부
    isOnCampus: z.boolean().default(true),

    // UI 상태
    addLink: z.boolean().default(false),
    addContact: z.boolean().default(false),
  });
};

const validateSchema = <T extends z.ZodSchema>(
  schema: T,
): z.ZodType<UploadExperimentPostSubmitSchemaType> => {
  return schema.superRefine((data: UploadExperimentPostSchemaType, ctx) => {
    // addLink가 true일 때 formUrl이 필수값
    if (data.addLink) {
      if (!data.applyMethodInfo.formUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['applyMethodInfo', 'formUrl'],
          message: '링크를 입력해 주세요',
        });
      }
    }

    // addContact가 true일 때 phoneNum이 필수값
    if (data.addContact) {
      if (!data.applyMethodInfo.phoneNum) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['applyMethodInfo', 'phoneNum'],
          message: '연락처를 입력해 주세요',
        });
      }
    }

    // 교내 실험일 때 place가 필수값
    if (data.isOnCampus) {
      if (!data.place || data.place.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['place'],
          message: '학교명을 입력해 주세요',
        });
      }
    }

    // 대면 실험 포함 + 교내 실험이 아닐 때 detailedAddress가 필수값
    if (data.matchType !== MATCH_TYPE.ONLINE && !data.isOnCampus) {
      if (!data.detailedAddress || data.detailedAddress.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['detailedAddress'],
          message: '상세 주소를 입력해 주세요',
        });
      }
    }
  });
};

export const UploadExperimentPostSchema = () => {
  return validateSchema(UploadExperimentPostFormSchema());
};

export const UploadExperimentPostSubmitSchema = () => {
  return validateSchema(
    UploadExperimentPostFormSchema().omit({
      addLink: true,
      addContact: true,
    }),
  );
};

export type UploadExperimentPostSchemaType = z.infer<
  ReturnType<typeof UploadExperimentPostFormSchema>
>;

export type UploadExperimentPostSubmitSchemaType = Omit<
  UploadExperimentPostSchemaType,
  'addLink' | 'addContact'
>;
