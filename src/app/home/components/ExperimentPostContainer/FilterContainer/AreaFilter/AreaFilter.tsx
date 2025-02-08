'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import {
  triggerWrapper,
  regionContentContainer,
  contentWrapper,
  areaListContainer,
  areaName,
  selectedRegionName,
  areaCount,
  areaButtonRecipe,
  verticalLine,
  subAreaListContainer,
  subAreaItem,
  selectedSubAreaLabel,
  checkbox,
  subAreaInfo,
  placeholderArea,
  footerContainer,
  footerButtonContainer,
  buttonRecipe,
  areaOpacity,
} from './AreaFilter.css';

import { ExperimentPostListFilters } from '@/apis/post';
import { AREA_ALL, REGION_MAPPER, AREA_MAPPER } from '@/app/home/home.constants';
import { AreaAll } from '@/app/home/home.types';
import { getRegionFilterText, isCheckedAreaAll } from '@/app/home/home.utils';
import usePostAreaCountQuery from '@/app/home/hooks/usePostAreaCountQuery';
import usePostRegionCountQuery from '@/app/home/hooks/usePostRegionCountQuery';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import { RegionType } from '@/types/filter';

const MAX_SELECTED_AREAS = 5;

interface AreaFilterProps {
  filters: ExperimentPostListFilters;
  onChange: (key: string, value: string | string[] | number | null) => void;
}

// 지역 필터링
const AreaFilter = ({ filters, onChange }: AreaFilterProps) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionType | 'ALL' | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<Record<string, boolean>>({});
  const selectedAreaList = Object.keys(selectedAreas).filter((key) => selectedAreas[key]);
  const isValidAreas =
    selectedAreaList.length < MAX_SELECTED_AREAS && isCheckedAreaAll(selectedAreas);

  const { data: postRegion } = usePostRegionCountQuery(selectedRegion);
  const { data: postAreas } = usePostAreaCountQuery(selectedRegion);

  const [isOpen, setIsOpen] = useState(false);

  const isSelected = Boolean(filters.region) || Boolean(filters.areas);

  const handleClickRegion = (area: RegionType | 'ALL') => {
    setSelectedRegion(area);
    setSelectedAreas({});
  };

  const handleClickArea = (subArea: string) => {
    if (AREA_ALL.includes(subArea as AreaAll)) {
      setSelectedAreas((prev) => ({ [subArea]: !prev[subArea] }));
    } else {
      setSelectedAreas((prev) => ({
        ...prev,
        [subArea]: !prev[subArea],
      }));
    }
  };

  const handleClickSave = () => {
    setIsOpen(false);
    onChange('region', selectedRegion);
    onChange('areas', selectedAreaList.length > 0 ? selectedAreaList : null);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
        className={triggerWrapper}
        style={assignInlineVars({
          '--trigger-color': isSelected ? colors.text01 : colors.text06,
          '--trigger-bg': isSelected ? colors.field09 : colors.field01,
        })}
      >
        <span>{getRegionFilterText(filters.region, filters.areas)}</span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={regionContentContainer}>
          <div className={contentWrapper}>
            <div className={areaListContainer}>
              <button
                className={areaButtonRecipe({ selected: selectedRegion === 'ALL' })}
                onClick={() => handleClickRegion('ALL')}
              >
                <span className={`${areaName} ${selectedRegion === 'ALL' && selectedRegionName}`}>
                  {REGION_MAPPER['ALL']}
                </span>
                <span className={areaCount}>
                  {postRegion?.reduce((acc, cur) => acc + cur.count, 0)}
                </span>
              </button>
              {postRegion?.map((area, idx) => (
                <button
                  key={idx}
                  className={areaButtonRecipe({ selected: area.name === selectedRegion })}
                  onClick={() => handleClickRegion(area.name)}
                >
                  <span
                    className={`${areaName} ${area.name === selectedRegion && selectedRegionName}`}
                  >
                    {REGION_MAPPER[area.name]}
                  </span>
                  <span className={areaCount}>{area.count}</span>
                </button>
              ))}
            </div>
            <span className={verticalLine} />
            <div className={subAreaListContainer}>
              {selectedRegion ? (
                postAreas?.map((subArea, idx) => (
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
                      <span
                        className={`${areaName} ${
                          selectedAreas[subArea.name] && selectedRegionName
                        }`}
                      >
                        {AREA_MAPPER[subArea.name]}
                      </span>
                      <span className={areaCount}>{subArea.count}</span>
                    </div>
                    <input
                      type="checkbox"
                      className={checkbox}
                      checked={!!selectedAreas[subArea.name]}
                      onChange={() => handleClickArea(subArea.name)}
                      disabled={!isValidAreas && !selectedAreas[subArea.name]}
                    />
                    {!!selectedAreas[subArea.name] ? (
                      <Icon
                        icon="CheckSquareFill"
                        width={20}
                        height={20}
                        color={colors.primaryMint}
                      />
                    ) : (
                      <Icon icon="CheckSquareEmpty" width={20} height={20} />
                    )}
                  </label>
                ))
              ) : (
                <div className={placeholderArea}>
                  <span>지역을 먼저 선택해 주세요</span>
                </div>
              )}
            </div>
          </div>
          <div className={footerContainer}>
            <div className={footerButtonContainer}>
              <button
                className={buttonRecipe({ type: 'reset' })}
                onClick={() => {
                  setSelectedRegion(null);
                  setSelectedAreas({});
                }}
              >
                초기화
              </button>
              <button onClick={handleClickSave} className={buttonRecipe({ type: 'save' })}>
                저장
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AreaFilter;
