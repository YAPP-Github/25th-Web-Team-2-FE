import { usePathname } from 'next/navigation';
import { useFormContext, useWatch } from 'react-hook-form';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { MatchType } from '@/types/uploadExperimentPost';
import { isResearcherInfo } from '@/utils/typeGuard';

const useMatchType = () => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const { control, setValue } = useFormContext();
  const { userInfo } = useUserInfo();

  const selectedMatchType = useWatch({ control, name: 'matchType' });

  // 대면 방식 선택 (비대면이면 실험 장소 null)
  const handleMatchTypeChange = (value: MatchType | null) => {
    setValue('matchType', value);

    if (value === MatchType.ONLINE) {
      setValue('region', null);
      setValue('area', null);
      setValue('place', null);
      setValue('detailedAddress', '');
    } else {
      setValue('region', '');
      setValue('area', '');
      setValue('place', !isEdit && userInfo && isResearcherInfo(userInfo) ? userInfo.univName : '');
      setValue('detailedAddress', '');
    }
  };

  return { selectedMatchType, handleMatchTypeChange };
};

export default useMatchType;
