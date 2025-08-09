import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import { MatchType } from '../post/[postId]/ExperimentPostPage.types';
import { UseApplyMethodQueryResponse } from '../post/[postId]/hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../post/[postId]/hooks/useExperimentDetailsQuery';

import { UPLOAD_REGION } from '@/constants/uploadRegion';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

// date 포맷 변환
const formatRange = (range: DateRange) => {
  return {
    from: range.from ? format(range.from, 'yyyy-MM-dd', { locale: ko }) : null,
    to: range.to ? format(range.to, 'yyyy-MM-dd', { locale: ko }) : null,
  };
};

// region value -> label 변환
const labelValueMap = new Map();

function initializeLabelValueMap() {
  UPLOAD_REGION.forEach((region) => {
    labelValueMap.set(region.label, region.value);
    region.children?.forEach((child) => {
      labelValueMap.set(child.label, child.value);
    });
  });
}

initializeLabelValueMap();

// label -> value
const convertLabelToValue = (labelToConvert: string): string => {
  return labelValueMap.get(labelToConvert) || labelToConvert;
};

const convertValueToLabel = (valueToConvert: string | null): string => {
  const label = Array.from(labelValueMap.entries()).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value === valueToConvert,
  )?.[0];
  return label || valueToConvert;
};

// 업로드된 이미지 경로 변경
const convertToWebpUrl = (originalUrl: string) => {
  return originalUrl
    .replace('/images/', '/resized-images/') // 폴더 변경
    .replace(/\.\w+$/, '.webp'); // 확장자 변경 (jpg, png → webp)
};

//  Date 객체로 변환
const parseDateString = (dateString: string | null) => {
  if (!dateString) return null;
  return parseISO(dateString);
};

// originFormData 생성
const transformOriginFormData = (
  experiment: UseQueryExperimentDetailsAPIResponse,
  applyMethod: UseApplyMethodQueryResponse,
): UploadExperimentPostSchemaType => ({
  leadResearcher: experiment.summary.leadResearcher,
  startDate: experiment.summary.startDate,
  endDate: experiment.summary.endDate,
  matchType: experiment.summary.matchType as MatchType,
  reward: experiment.summary.reward,
  place: experiment.address.place,
  detailedAddress: experiment.address.detailedAddress,
  region: experiment.address.region,
  area: convertValueToLabel(experiment.address.area),
  count: experiment.summary.count,
  timeRequired: experiment.summary.timeRequired as UploadExperimentPostSchemaType['timeRequired'],
  title: experiment.title,
  content: experiment.content,
  applyMethodInfo: {
    content: applyMethod.content,
    formUrl: applyMethod.formUrl,
    phoneNum: applyMethod.phoneNum,
  },
  targetGroupInfo: {
    startAge: experiment.targetGroup.startAge ?? 0,
    endAge: experiment.targetGroup.endAge ?? 0,
    genderType: experiment.targetGroup.genderType,
    otherCondition: experiment.targetGroup.otherCondition || '',
  },
  imageListInfo: {
    images: experiment.imageList,
  },
  alarmAgree: experiment.alarmAgree,
});

const uploadImages = async (
  images: (File | string)[],
  uploadImageMutation: (file: File) => Promise<string>,
): Promise<string[]> => {
  const newFiles = images.filter((img): img is File => img instanceof File);
  const uploaded = await Promise.all(newFiles.map(uploadImageMutation));

  let index = 0;
  return images.map((img) => (img instanceof File ? uploaded[index++] : img)) as string[];
};

export {
  formatRange,
  convertLabelToValue,
  convertValueToLabel,
  convertToWebpUrl,
  parseDateString,
  transformOriginFormData,
  uploadImages,
};
