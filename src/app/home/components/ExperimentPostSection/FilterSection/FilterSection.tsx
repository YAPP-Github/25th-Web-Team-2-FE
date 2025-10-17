import FilterContainer from './FilterContainer/FilterContainer';

import { ExperimentPostListFilters } from '@/apis/post';
import { calculateAgeFromBirthDate } from '@/app/home/home.utils';
import { getInitialParticipantInfo } from '@/app/home/server/getInitialParticipantInfo';

interface FilterSectionProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

const FilterSection = async ({ searchParams }: FilterSectionProps) => {
  const initialParticipantInfo = await getInitialParticipantInfo();
  const hasQueryParams = Object.keys(searchParams).length > 0;

  const initialGender = initialParticipantInfo ? initialParticipantInfo.gender : undefined;
  const initialAge = initialParticipantInfo
    ? calculateAgeFromBirthDate(initialParticipantInfo.birthDate)
    : undefined;

  return (
    <FilterContainer
      initialGender={hasQueryParams ? undefined : initialGender}
      initialAge={hasQueryParams ? undefined : initialAge}
      searchParams={searchParams}
    />
  );
};

export default FilterSection;
