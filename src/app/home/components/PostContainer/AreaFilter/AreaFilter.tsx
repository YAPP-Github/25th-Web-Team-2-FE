'use client';

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import Icon from '@/components/Icon';
import theme from '@/styles/theme';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { fetchPostCount } from '@/apis/post';
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

type Area =
  | '전국'
  | '서울'
  | '경기'
  | '인천'
  | '강원'
  | '대전'
  | '세종'
  | '충남'
  | '충북'
  | '부산'
  | '울산'
  | '경남'
  | '경북'
  | '대구'
  | '광주'
  | '전남'
  | '전북'
  | '제주';

type SeoulArea =
  | '전체'
  | '금천구'
  | '노원구'
  | '도봉구'
  | '동대문구'
  | '동작구'
  | '마포구'
  | '서대문구'
  | '서초구'
  | '성동구'
  | '성북구'
  | '송파구'
  | '양천구'
  | '영등포구'
  | '용산구'
  | '은평구'
  | '종로구'
  | '중구'
  | '중랑구';

interface Region {
  id: number;
  name: Area;
  count: number;
}

interface SeoulRegion {
  id: number;
  name: SeoulArea;
  count: number;
}

const areas: Region[] = [
  { id: 1, name: '전국', count: 4321 },
  { id: 2, name: '서울', count: 1234 },
  { id: 3, name: '경기', count: 134 },
  { id: 4, name: '인천', count: 134 },
  { id: 5, name: '강원', count: 134 },
  { id: 6, name: '대전', count: 134 },
  { id: 7, name: '세종', count: 13 },
  { id: 8, name: '충남', count: 124 },
  { id: 9, name: '충북', count: 43 },
  { id: 10, name: '부산', count: 21 },
  { id: 11, name: '울산', count: 21 },
  { id: 12, name: '경남', count: 21 },
  { id: 13, name: '경북', count: 21 },
  { id: 14, name: '대구', count: 21 },
  { id: 15, name: '광주', count: 21 },
  { id: 16, name: '전남', count: 21 },
  { id: 17, name: '전북', count: 21 },
  { id: 18, name: '제주', count: 21 },
];

const areaMapper = {
  SEOUL: '서울',
  GYEONGGI: '경기',
  INCHEON: '인천',
  GANGWON: '강원',
  DAEJEON: '대전',
  CHUNGNAM: '충남',
  CHUNGBUK: '충북',
  BUSAN: '부산',
  ULSAN: '울산',
  GYEONGNAM: '경남',
  GYEONGBUK: '경북',
  DAEGU: '대구',
  GWANGJU: '광주',
  JEONNAM: '전남',
  JEONBUK: '전북',
  JEJU: '제주',
};

const subAreas: Partial<Record<Area, SeoulRegion[]>> = {
  서울: [
    { id: 1, name: '전체', count: 1234 },
    { id: 1, name: '금천구', count: 1234 },
    { id: 1, name: '노원구', count: 1234 },
    { id: 1, name: '도봉구', count: 1234 },
    { id: 1, name: '동대문구', count: 1234 },
    { id: 1, name: '동작구', count: 1234 },
    { id: 2, name: '마포구', count: 234 },
    { id: 3, name: '서대문구', count: 123 },
    { id: 4, name: '서초구', count: 23 },
    { id: 5, name: '성동구', count: 412 },
    { id: 5, name: '성북구', count: 412 },
    { id: 5, name: '송파구', count: 412 },
    { id: 5, name: '양천구', count: 412 },
    { id: 5, name: '영등포구', count: 412 },
    { id: 5, name: '용산구', count: 412 },
    { id: 5, name: '은평구', count: 412 },
    { id: 5, name: '종로구', count: 412 },
    { id: 5, name: '중구', count: 412 },
    { id: 5, name: '중랑구', count: 412 },
  ],
};

const AreaFilter = () => {
  const [selectedArea, setSelectedArea] = useState<(typeof areas)[0]['name']>('전국');
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
