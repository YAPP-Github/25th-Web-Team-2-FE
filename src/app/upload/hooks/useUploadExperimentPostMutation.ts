import { useMutation } from '@tanstack/react-query';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { API_URL } from '@/constants/url';
import { MatchType } from '@/types/uploadExperimentPost';

export interface ExperimentPostData {
  startDate?: string | null;
  endDate?: string | null;
  matchType: MatchType;
  count: number;
  timeRequired?:
    | 'LESS_30M'
    | 'ABOUT_30M'
    | 'ABOUT_1H'
    | 'ABOUT_1H30M'
    | 'ABOUT_2H'
    | 'ABOUT_2H30M'
    | 'ABOUT_3H'
    | 'ABOUT_3H30M'
    | 'ABOUT_4H'
    | null;
  leadResearcher: string;
  place?: string | null;
  region?: string | null;
  area?: string | null;
  detailedAddress?: string;
  reward: string;
  title: string;
  content: string;
  imageListInfo?: {
    images?: string[];
  };
  applyMethodInfo: {
    content: string;
    formUrl?: string | null;
    phoneNum?: string | null;
  };
  targetGroupInfo: {
    startAge: number;
    endAge: number;
    genderType: GenderType;
    otherCondition?: string;
  };
  alarmAgree: boolean;
}

export interface UploadedPostInfo {
  experimentPostId: number;
  title: string;
  views: number;
  place: string;
  reward: string;
  durationInfo: {
    startDate: string;
    endDate: string;
  };
}

export interface UseUploadExperimentPostMutationResponse {
  postInfo: UploadedPostInfo;
}

const useUploadExperimentPostMutation = () => {
  const mutationKey = API_URL.uploadPost;
  const mutationFn = async (data: ExperimentPostData) =>
    await fetchClient.post<UseUploadExperimentPostMutationResponse>(mutationKey, {
      body: data,
    });

  return useMutation<UseUploadExperimentPostMutationResponse, CustomError, ExperimentPostData>({
    mutationKey: [mutationKey],
    mutationFn,
  });
};

export default useUploadExperimentPostMutation;
