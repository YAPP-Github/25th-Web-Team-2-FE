'use client';

import { AreaType, ExperimentPostListFilterParams } from '@/types/filter';
import { ExperimentPostListFilters } from '@apis/post';
import usePostAreaCountQuery from '@home/hooks/usePostAreaCountQuery';
import usePostRegionCountQuery from '@home/hooks/usePostRegionCountQuery';

import { contentWrapper, verticalLine } from './AreaFilterContent.css';
import useAreaFilter from '../../hooks/useAreaFilter';
import AreaContainer from '../AreaContainer';
import FooterButtonContainer from '../FooterButtonContainer';
import RegionContainer from '../RegionContainer';


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
