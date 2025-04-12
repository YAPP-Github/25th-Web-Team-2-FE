import { areaButtonRecipe, regionContainer, selectedRegionName } from './RegionContainer.css';
import { areaCount, areaName } from '../../AreaFilter.css';

import { ExperimentPostRegion } from '@/apis/post';
import { REGION_MAPPER } from '@/app/home/home.constants';
import { RegionType } from '@/types/filter';

interface RegionContainerProps {
  selectedRegion: string | null;
  handleSelectRegion: (region: RegionType) => void;
  experimentPostRegion?: ExperimentPostRegion[];
}

const RegionContainer = ({
  experimentPostRegion,
  selectedRegion,
  handleSelectRegion,
}: RegionContainerProps) => {
  return (
    <div className={regionContainer}>
      {experimentPostRegion?.map((area) => (
        <button
          key={area.name}
          className={areaButtonRecipe({ selected: area.name === selectedRegion })}
          onClick={() => handleSelectRegion(area.name)}
        >
          <span className={`${areaName} ${area.name === selectedRegion && selectedRegionName}`}>
            {REGION_MAPPER[area.name]}
          </span>
          <span className={areaCount}>{area.count}</span>
        </button>
      ))}
    </div>
  );
};

export default RegionContainer;
