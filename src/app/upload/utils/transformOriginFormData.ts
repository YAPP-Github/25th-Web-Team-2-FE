import { MatchType } from '@/types/filter';
import { UseApplyMethodQueryResponse } from '@post/[postId]/hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '@post/[postId]/hooks/useExperimentDetailsQuery';
import { UploadExperimentPostSchemaType } from '@schema/upload/uploadExperimentPostSchema';

import { convertValueToLabel } from './regionLabelValue';

export const transformOriginFormData = (
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
  isOnCampus: experiment.address.isOnCampus,
  addLink: !!applyMethod.formUrl,
  addContact: !!applyMethod.phoneNum,
});
