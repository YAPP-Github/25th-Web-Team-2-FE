import { useQuery } from '@tanstack/react-query';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';
import { MatchType } from '@/types/uploadExperimentPost';

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
}

const useExperimentDetailsQuery = ({ postId }: { postId?: string }) => {
  const { isLoading: isUserInfoLoading } = useUserInfo();
  const url = API_URL.viewExperimentDetails(postId!);
  const queryFn = () => fetchClient.post<UseQueryExperimentDetailsAPIResponse>(url);

  return useQuery<UseQueryExperimentDetailsAPIResponse, CustomError>({
    queryKey: [QUERY_KEY.experimentPostDetail, postId],
    queryFn,
    enabled: !!postId && !isUserInfoLoading,
  });
};

export default useExperimentDetailsQuery;
