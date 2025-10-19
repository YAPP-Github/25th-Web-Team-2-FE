import { assignInlineVars } from '@vanilla-extract/dynamic';

import {
  areaOpacity,
  checkbox,
  placeholderArea,
  selectedRegionName,
  selectedSubAreaLabel,
  subAreaInfo,
  subAreaItem,
  subAreaListContainer,
} from './AreaContainer.css';
import { areaCount, areaName } from '../../AreaFilter.css';

import { ExperimentPostArea } from '@/apis/post';
import { AREA_MAPPER } from '@/app/home/home.constants';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import { AreaType } from '@/types/filter';

const PLACEHOLDER_TEXT = '지역을 먼저\n선택해 주세요';

interface AreaContainerProps {
  selectedRegion: string | null;
  handleSelectArea: (area: AreaType) => void;
  isValidAreas: boolean;
  selectedAreas: Partial<Record<AreaType, boolean>>;
  experimentPostAreas?: ExperimentPostArea[];
}

const AreaContainer = ({
  selectedRegion,
  handleSelectArea,
  isValidAreas,
  selectedAreas,
  experimentPostAreas,
}: AreaContainerProps) => {
  return (
    <div className={subAreaListContainer}>
      {selectedRegion ? (
        experimentPostAreas?.map((subArea, idx) => (
          <label
            key={idx}
            className={`${subAreaItem} 
              ${selectedAreas[subArea.name] && selectedSubAreaLabel}`}
          >
            <div
              className={subAreaInfo}
              style={assignInlineVars({
                [areaOpacity]: !isValidAreas && !selectedAreas[subArea.name] ? '0.6' : '1',
              })}
            >
              <span className={`${areaName} ${selectedAreas[subArea.name] && selectedRegionName}`}>
                {AREA_MAPPER[subArea.name]}
              </span>
              <span className={areaCount}>{subArea.count}</span>
            </div>
            <input
              type="checkbox"
              className={checkbox}
              checked={!!selectedAreas[subArea.name]}
              onChange={() => handleSelectArea(subArea.name)}
              disabled={!isValidAreas && !selectedAreas[subArea.name]}
            />
            {!!selectedAreas[subArea.name] ? (
              <Icon icon="CheckSquareFill" width={20} height={20} color={colors.primaryMint} />
            ) : (
              <Icon icon="CheckSquareEmpty" width={20} height={20} />
            )}
          </label>
        ))
      ) : (
        <div className={placeholderArea}>
          <span>{PLACEHOLDER_TEXT}</span>
        </div>
      )}
    </div>
  );
};

export default AreaContainer;
