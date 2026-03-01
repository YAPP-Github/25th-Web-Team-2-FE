import FilterContainer from './FilterContainer/FilterContainer';

import { ExperimentPostListFilters } from '@/apis/post';
import { fetchParticipantInfo } from '@/app/home/server/fetchParticipantInfo';
import { calculateAgeFromBirthDate } from '@/app/home/utils/calculateAgeFromBirthDate';

interface FilterSectionProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

const FilterSection = async ({ searchParams }: FilterSectionProps) => {
  const initialParticipantInfo = await fetchParticipantInfo();
  const hasQueryParams = Object.keys(searchParams).length > 0;

  const initialGender = initialParticipantInfo ? initialParticipantInfo.gender : undefined;
  const initialAge = initialParticipantInfo
    ? calculateAgeFromBirthDate(initialParticipantInfo.birthDate)
    : undefined;

  return (
    <FilterContainer
      initialGender={hasQueryParams ? undefined : initialGender}
      initialAge={hasQueryParams ? undefined : initialAge}
    />
  );
};

export default FilterSection;
