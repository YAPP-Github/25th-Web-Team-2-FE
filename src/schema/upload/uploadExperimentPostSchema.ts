import { z } from 'zod';

import { GENDER_TYPE, MATCH_TYPE } from '@/app/post/[postId]/ExperimentPostPage.types';

export type UploadExperimentPostSchemaType = z.infer<ReturnType<typeof UploadExperimentPostSchema>>;

interface UploadExperimentPostSchemaProps {
  addLink: boolean;
  addContact: boolean;
  isOnCampus: boolean;
}
const UploadExperimentPostSchema = ({
  addLink,
  addContact,
  isOnCampus,
}: UploadExperimentPostSchemaProps) => {
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
    // 장소
    // todo isOnCampus에 따른 조건 처리 수정 필요
    place: isOnCampus ? z.string().nullable() : z.string().min(1, '').nullable(),
    // 지역
    region: z.string().min(1, '').nullable(),
    // 지역구
    area: z.string().min(1, '').nullable(),
    // 상세 주소
    detailedAddress: z
      .string()
      .max(70, { message: '최대 70자 이하로 입력해 주세요' })
      .superRefine((val, ctx) => {
        if (!isOnCampus && val.trim().length === 0) {
          ctx.addIssue({
            code: 'custom',
            message: '상세 주소를 입력해 주세요',
          });
        }
      }),
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
      formUrl: addLink
        ? z
            .string({ message: '' })
            .max(100, '최대 100자 이하로 입력해 주세요')
            .url({ message: '링크를 입력해 주세요' })
        : z.string().nullable(),
      // 연락처
      phoneNum: addContact
        ? z.string({ message: '' }).max(50, '최대 50자 이하로 입력해 주세요')
        : z.string().nullable(),
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

    alarmAgree: z.boolean().default(false), // 알람 동의

    isOnCampus: z.boolean().default(true), // 교내 실험 여부
  });
};

export default UploadExperimentPostSchema;
