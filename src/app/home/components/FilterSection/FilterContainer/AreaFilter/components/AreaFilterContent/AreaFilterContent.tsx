'use client';

import { contentWrapper, verticalLine } from './AreaFilterContent.css';
import useAreaFilter from '../../hooks/useAreaFilter';
import AreaContainer from '../AreaContainer/AreaContainer';
import FooterButtonContainer from '../FooterButtonContainer/FooterButtonContainer';
import RegionContainer from '../RegionContainer/RegionContainer';

import { ExperimentPostListFilters } from '@/apis/post';
import usePostAreaCountQuery from '@/app/home/hooks/usePostAreaCountQuery';
import usePostRegionCountQuery from '@/app/home/hooks/usePostRegionCountQuery';
import { AreaType, ExperimentPostListFilterParams } from '@/types/filter';

interface AreaFilterContentProps {
  initialRegion?: ExperimentPostListFilters['region'];
  initialAreas?: ExperimentPostListFilters['areas'];
  onChange: (filters: ExperimentPostListFilterParams) => void;
  onClose: () => void;
}

const AreaFilterContent = ({
  initialRegion,
  initialAreas,
  onChange,
  onClose,
}: AreaFilterContentProps) => {
  const {
    selectedRegion,
    selectedAreas,
    selectedAreaList,
    isValidAreas,
    isValidSaveButton,
    handleReset,
    handleSelectRegion,
    handleSelectArea,
  } = useAreaFilter({
    initialRegion,
    initialAreas,
  });

  const { data: experimentPostRegion } = usePostRegionCountQuery(selectedRegion);
  const { data: experimentPostAreas } = usePostAreaCountQuery(selectedRegion);

  const handleSave = () => {
    onChange({
      region: selectedRegion,
      areas: selectedAreaList.length > 0 ? (selectedAreaList as AreaType[]) : null,
    });
    onClose();
  };

  return (
    <>
      <div className={contentWrapper}>
        <RegionContainer
          experimentPostRegion={experimentPostRegion}
          selectedRegion={selectedRegion}
          handleSelectRegion={handleSelectRegion}
        />
        <span className={verticalLine} />
        <AreaContainer
          experimentPostAreas={experimentPostAreas}
          selectedRegion={selectedRegion}
          handleSelectArea={handleSelectArea}
          isValidAreas={isValidAreas}
          selectedAreas={selectedAreas}
        />
      </div>
      <FooterButtonContainer
        handleReset={handleReset}
        handleSave={handleSave}
        isValidSaveButton={isValidSaveButton}
      />
    </>
  );
};

export default AreaFilterContent;
