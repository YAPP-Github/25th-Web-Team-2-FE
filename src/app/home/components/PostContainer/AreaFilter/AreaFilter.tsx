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
  selectedAreaName,
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
} from './AreaFilter.css';

import { areaMapper, subAreaMapper } from '@/app/home/home.constants';
import { Area } from '@/app/home/home.types';
import useFilterAreaQuery from '@/app/home/hooks/useFilterAreaQuery';
import useFilterSubAreaQuery from '@/app/home/hooks/useFilterSubAreaQuery';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface AreaFilterProps {
  onChange: (key: string, value: string | number) => void;
}

const AreaFilter = ({ onChange }: AreaFilterProps) => {
  const [selectedArea, setSelectedArea] = useState<Area | 'ALL' | ''>('');
  const [checkedSubAreas, setCheckedSubAreas] = useState<Record<string, boolean>>({});
  const selectedSubArea = Object.keys(checkedSubAreas);

  const { data: postArea } = useFilterAreaQuery(selectedArea);
  const { data: postSubArea } = useFilterSubAreaQuery(selectedArea);

  const handleAreaClick = (area: Area | 'ALL') => {
    setSelectedArea(area);
  };

  const handleSubAreaCheck = (subArea: string) => {
    setCheckedSubAreas((prev) => ({
      ...prev,
      [subArea]: !prev[subArea],
    }));
  };

  // TODO: subarea 여러개도 되도록 개선
  const handleClickSave = () => {
    setIsSelected(true);
    setIsOpen(false);
    onChange('region', selectedArea);
    onChange('areas', selectedSubArea[0]);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
        className={triggerWrapper}
        style={assignInlineVars({
          '--trigger-color': isSelected ? colors.text01 : colors.text06,
          '--trigger-bg': isSelected ? colors.field09 : colors.field01,
        })}
      >
        <span>
          {isSelected
            ? `${areaMapper[selectedArea]} . ${subAreaMapper[selectedSubArea[0]] ?? ''} ${
                selectedSubArea.length >= 2 ? `외 ${selectedSubArea.length - 1}` : ''
              }`
            : '지역'}
        </span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={regionContentContainer}>
          <div className={contentWrapper}>
            <div className={areaListContainer}>
              <button
                className={areaButtonRecipe({ selected: selectedArea === 'ALL' })}
                onClick={() => handleAreaClick('ALL')}
              >
                <span className={`${areaName} ${selectedArea === 'ALL' && selectedAreaName}`}>
                  {areaMapper['ALL']}
                </span>
                <span className={areaCount}>
                  {postArea?.reduce((acc, cur) => acc + cur.count, 0)}
                </span>
              </button>
              {postArea?.map((area, idx) => (
                <button
                  key={idx}
                  className={areaButtonRecipe({ selected: area.name === selectedArea })}
                  onClick={() => handleAreaClick(area.name)}
                >
                  <span className={`${areaName} ${area.name === selectedArea && selectedAreaName}`}>
                    {areaMapper[area.name]}
                  </span>
                  <span className={areaCount}>{area.count}</span>
                </button>
              ))}
            </div>
            <span className={verticalLine} />
            <div className={subAreaListContainer}>
              {selectedArea ? (
                postSubArea?.map((subArea, idx) => (
                  <label
                    key={idx}
                    className={`${subAreaItem} 
                      ${checkedSubAreas[subArea.name] && selectedSubAreaLabel}`}
                  >
                    <div className={subAreaInfo}>
                      <span
                        className={`${areaName} ${
                          checkedSubAreas[subArea.name] && selectedAreaName
                        }`}
                      >
                        {subAreaMapper[subArea.name]}
                      </span>
                      <span className={areaCount}>{subArea.count}</span>
                    </div>
                    <input
                      type="checkbox"
                      className={checkbox}
                      checked={!!checkedSubAreas[subArea.name]}
                      onChange={() => handleSubAreaCheck(subArea.name)}
                    />
                    {!!checkedSubAreas[subArea.name] ? (
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
                  setSelectedArea('');
                  setCheckedSubAreas({});
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
