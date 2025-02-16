import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API } from '@/apis/config';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { QUERY_KEY } from '@/constants/queryKey';
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
  matchType: 'OFFLINE' | 'ONLINE' | 'ALL';
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

const useExperimentDetailsQuery = ({ postId }: { postId: string }) => {
  const { isLoading: isUserInfoLoading } = useUserInfo();
  const url = API_URL.viewExperimentDetails(postId);
  const queryFn = () => API.post(url).then((res) => res.data);

  return useQuery<UseQueryExperimentDetailsAPIResponse, AxiosError>({
    queryKey: [QUERY_KEY.experimentPostDetail, postId],
    queryFn,
    enabled: !!postId && !isUserInfoLoading,
  });
};

export default useExperimentDetailsQuery;
