import { usePathname } from 'next/navigation';
import { useFormContext, useWatch } from 'react-hook-form';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { MatchType } from '@/types/uploadExperimentPost';

const useMatchType = () => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const { control, setValue } = useFormContext();
  const { userInfo } = useUserInfo();

  const selectedMatchType = useWatch({ control, name: 'matchType' });

  const isResearcher = (
    user: ParticipantResponse | ResearcherResponse,
  ): user is ResearcherResponse => (user as ResearcherResponse).memberInfo.role === 'RESEARCHER';

  // 대면 방식 선택 (비대면이면 실험 장소 null)
  const handleMatchTypeChange = (value: MatchType | null) => {
    setValue('matchType', value);

    if (value === MatchType.ONLINE) {
      setValue('region', null);
      setValue('area', null);
      setValue('place', null);
      setValue('detailedAddress', null);
    } else {
      setValue('region', '');
      setValue('area', '');
      setValue('place', !isEdit && userInfo && isResearcher(userInfo) ? userInfo.univName : '');
      setValue('detailedAddress', '');
    }
  };

  return { selectedMatchType, handleMatchTypeChange };
};

export default useMatchType;
