import { useQuery } from '@tanstack/react-query';

import { GenderType, MatchType } from '../ExperimentPostPage.types';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface TargetGroup {
  startAge: number | null;
  endAge: number | null;
  genderType: GenderType;
  otherCondition: string | null;
}

interface Summary {
  startDate: string | null;
  endDate: string | null;
  leadResearcher: string;
  matchType: MatchType;
  reward: string;
  count: number;
  timeRequired: string | null;
}

interface Address {
  place: string | null;
  region: string | null;
  area: string | null;
  detailedAddress: string;
}

export interface UseQueryExperimentDetailsAPIResponse {
  experimentPostId: string;
  title: string;
  uploadDate: string;
  uploaderName: string;
  isUploaderActive: boolean;
  views: number;
  recruitStatus: boolean;
  summary: Summary;
  targetGroup: TargetGroup;
  address: Address;
  content: string;
  imageList: string[];
  isAuthor: boolean;
  alarmAgree: boolean;
  isOnCampus: boolean;
}

const useExperimentDetailsQuery = ({ postId }: { postId?: string }) => {
  const { isLoading: isUserInfoLoading } = useUserInfo();
  const url = API_URL.viewExperimentDetails(postId!);
  const queryFn = () => fetchClient.post<UseQueryExperimentDetailsAPIResponse>(url);

  return useQuery<UseQueryExperimentDetailsAPIResponse, CustomError>({
    queryKey: queryKey.experimentPostDetail(postId ?? ''),
    queryFn,
    enabled: !!postId && !isUserInfoLoading,
  });
};

export default useExperimentDetailsQuery;
