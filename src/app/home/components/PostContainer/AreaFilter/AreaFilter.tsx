'use client';

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import Icon from '@/components/Icon';
import theme from '@/styles/theme';
import {
  areaButton,
  areaCount,
  areaListContainer,
  areaName,
  checkbox,
  contentWrapper,
  footerButtonContainer,
  footerContainer,
  placeholderArea,
  regionContentContainer,
  resetButton,
  saveButton,
  selectedAreaButton,
  selectedAreaName,
  selectedSubAreaLabel,
  subAreaInfo,
  subAreaItem,
  subAreaListContainer,
  triggerWrapper,
  verticalLine,
} from './AreaFilter.styles';
import { Area } from '@/app/home/home.types';
import { areas, subAreas } from '@/app/home/home.constants';

const AreaFilter = () => {
  const [selectedArea, setSelectedArea] = useState<Area>('전국');
  const [checkedSubAreas, setCheckedSubAreas] = useState<Record<string, boolean>>({});
  const selectedSubArea = Object.keys(checkedSubAreas);

  const handleAreaClick = (area: Area) => {
    setSelectedArea(area);
  };

  const handleSubAreaCheck = (subArea: string) => {
    setCheckedSubAreas((prev) => ({
      ...prev,
      [subArea]: !prev[subArea],
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Popover.Trigger
        css={triggerWrapper}
        style={{
          color: isSelected ? theme.colors.text01 : theme.colors.text06,
          backgroundColor: isSelected ? theme.colors.field09 : theme.colors.field01,
        }}
      >
        <span>
          {isSelected
            ? `${selectedArea} . ${selectedSubArea[0]} ${
                selectedSubArea.length >= 2 ? `외 ${selectedSubArea.length - 1}` : ''
              }`
            : '지역'}
        </span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content css={regionContentContainer}>
          <div css={contentWrapper}>
            <div css={areaListContainer}>
              {areas.map((area) => (
                <button
                  key={area.id}
                  css={[areaButton, area.name === selectedArea && selectedAreaButton]}
                  onClick={() => handleAreaClick(area.name)}
                >
                  <span css={[areaName, area.name === selectedArea && selectedAreaName]}>
                    {area.name}
                  </span>
                  <span css={areaCount}>{area.count}</span>
                </button>
              ))}
            </div>
            <span css={verticalLine} />
            <div css={subAreaListContainer}>
              {selectedArea ? (
                subAreas[selectedArea]?.map((subArea) => (
                  <label
                    key={subArea.id}
                    css={[subAreaItem, checkedSubAreas[subArea.name] && selectedSubAreaLabel]}
                  >
                    <div css={subAreaInfo}>
                      <span css={[areaName, checkedSubAreas[subArea.name] && selectedAreaName]}>
                        {subArea.name}
                      </span>
                      <span css={areaCount}>{subArea.count}</span>
                    </div>
                    <input
                      type="checkbox"
                      css={checkbox}
                      checked={!!checkedSubAreas[subArea.name]}
                      onChange={() => handleSubAreaCheck(subArea.name)}
                    />
                    {!!checkedSubAreas[subArea.name] ? (
                      <Icon icon="CheckSquareFill" width={20} height={20} />
                    ) : (
                      <Icon icon="CheckSquareEmpty" width={20} height={20} />
                    )}
                  </label>
                ))
              ) : (
                <div css={placeholderArea}>
                  <span>지역을 먼저 선택해 주세요</span>
                </div>
              )}
            </div>
          </div>
          <div css={footerContainer}>
            <div css={footerButtonContainer}>
              <button
                css={resetButton}
                onClick={() => {
                  setSelectedArea('전국');
                  setCheckedSubAreas({});
                }}
              >
                초기화
              </button>
              <button
                onClick={() => {
                  setIsSelected(true);
                  setIsOpen(false);
                }}
                css={saveButton}
              >
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
