import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import { GenderType, MatchType } from '@/app/post/[postId]/ExperimentPostPage.types';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

export interface ExtractKeywordResponse {
  experimentPostKeywords: ExperimentPostKeywords;
}

export interface ExperimentPostKeywords {
  description?: string;

  targetGroup: TargetGroupKeyword;
  applyMethod: ApplyMethodKeyword;

  matchType: MatchType;
  reward: string;
  count: number;
  timeRequired:
    | 'LESS_30M'
    | 'ABOUT_30M'
    | 'ABOUT_1H'
    | 'ABOUT_1H30M'
    | 'ABOUT_2H'
    | 'ABOUT_2H30M'
    | 'ABOUT_3H'
    | 'ABOUT_3H30M'
    | 'ABOUT_4H';
}

export interface TargetGroupKeyword {
  startAge: number;
  endAge: number;
  genderType: GenderType;
  otherCondition?: string;
}

export interface ApplyMethodKeyword {
  content: string;
  isFormUrl: boolean;
  formUrl?: string;
  isPhoneNum: boolean;
  phoneNum?: string;
}

const useExtractKeywordsMutation = () => {
  const queryClient = useQueryClient();
  const mutationKey = API_URL.extractKeywords;
  const mutationFn = async (text: string) =>
    await fetchClient.post<ExtractKeywordResponse>(mutationKey, {
      body: { text },
    });

  return useMutation<ExtractKeywordResponse, CustomError, string>({
    mutationKey: [mutationKey],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.extractKeywordsLimit });
    },
  });
};

export default useExtractKeywordsMutation;
