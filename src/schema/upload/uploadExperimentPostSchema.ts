import { z } from 'zod';

import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { MatchType } from '@/types/uploadExperimentPost';

export type UploadExperimentPostSchemaType = z.infer<ReturnType<typeof UploadExperimentPostSchema>>;

interface UploadExperimentPostSchemaProps {
  matchType: MatchType;
  addLink: boolean;
  addContact: boolean;
}
const UploadExperimentPostSchema = ({
  matchType,
  addLink,
  addContact,
}: UploadExperimentPostSchemaProps) => {
  return z.object({
    targetGroupInfo: z.object({
      startAge: z.coerce.number().min(0, '0세 이상'), // 참여 가능 나이 (이상)
      endAge: z.coerce.number().min(0, '0세 이상'), // 참여 가능 나이 (이하)
      genderType: z.nativeEnum(GenderType), // 성별
      otherCondition: z.string().optional(), // 기타조건
    }),
    // imageListInfo: z.object({
    //   images: z.array(z.string()).optional(), // 이미지 목록 (최대 3장)
    // }),

    // 실험 시작 날짜
    startDate: z.union([z.string(), z.null()]),

    // 실험 종료 날짜
    endDate: z.union([z.string(), z.null()]),

    // 진행 방식
    matchType: z.nativeEnum(MatchType),

    // 실험 횟수
    count: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']).transform(Number), // 참여 횟수

    // 소요 시간
    timeRequired: z.union([
      z.enum([
        'LESS_30M',
        'ABOUT_30M',
        'ABOUT_1H',
        'ABOUT_1H30M',
        'ABOUT_2H',
        'ABOUT_2H30M',
        'ABOUT_3H',
        'ABOUT_3H30M',
        'ABOUT_4H',
      ]),
      z.null(),
    ]),

    // 연구 책임자
    leadResearcher: z
      .string()
      .min(10, { message: '최소 10자 이상으로 입력해 주세요' })
      .max(150, { message: '최대 150자 이하로 입력해 주세요' }),
    // 대학교
    univName: z.string({ required_error: '' }),
    // 지역
    region:
      matchType === MatchType.ONLINE ? z.string().optional() : z.string({ required_error: '' }),
    // 지역구
    area: matchType === MatchType.ONLINE ? z.string().optional() : z.string({ required_error: '' }),
    // 상세 주소
    detailedAddress: z.string().max(70, { message: '최대 70자 이하로 입력해 주세요' }),
    // 보상
    reward: z
      .string({ message: '최소 3자 이상으로 입력해 주세요' })
      .min(3, { message: '최소 3자 이상으로 입력해 주세요' }),

    // 실험 제목
    title: z
      .string()
      .min(5, '최소 5자 이상으로 입력해 주세요')
      .max(70, '최대 70자 이하로 입력해 주세요'),
    // 실험 본문
    content: z
      .string()
      .min(200, '최소 200자 이상으로 입력해 주세요')
      .max(5000, '최대 5000자 이하로 입력해 주세요'),

    applyMethodInfo: z.object({
      // 참여 방법
      content: z
        .string()
        .min(5, '최소 5자 이상으로 입력해 주세요')
        .max(200, '최대 200자 이하로 입력해 주세요'),
      // 링크
      formUrl: addLink
        ? z
            .string()
            .max(100, '최대 100자 이하로 입력해 주세요')
            .url({ message: '링크를 입력해 주세요' })
        : z.string().nullable(),
      // 연락처
      phoneNum: addContact
        ? z.string().max(100, '최대 100자 이하로 입력해 주세요')
        : z.string().nullable(),
    }),
    // alarmAgree: z.boolean().default(false), // 알람 동의
  });
};

export default UploadExperimentPostSchema;
