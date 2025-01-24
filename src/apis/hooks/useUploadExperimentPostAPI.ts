import { useMutation } from '@tanstack/react-query';

import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { MatchType } from '@/types/uploadExperimentPost';
import { API_URL } from '@/constants/url';
import { API } from '../config';

interface UseUploadExperimentPostAPIParams {
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
  univName?: string | null;
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

interface UploadedPostInfo {
  experimentPostId: number;
  title: string;
  views: number;
  univName: string;
  reward: string;
  durationInfo: {
    startDate: string;
    endDate: string;
  };
}

interface UseUploadExperimentPostAPIResponse {
  postInfo: UploadedPostInfo;
}

const useUploadExperimentPostAPI = () => {
  const mutationKey = API_URL.uploadPost;
  const mutationFn = async (data: UseUploadExperimentPostAPIParams) =>
    await API.post<UseUploadExperimentPostAPIResponse>(mutationKey, data).then((res) => res.data);

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn,
  });
};

export default useUploadExperimentPostAPI;
