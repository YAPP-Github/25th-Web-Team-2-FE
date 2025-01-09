'use client';

import * as Popover from '@radix-ui/react-popover';
import { css } from '@emotion/react';
import { useState } from 'react';
import Icon from '@/components/Icon';
import theme from '@/styles/theme';

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
  | '서울 전체'
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

const subAreas: Partial<Record<Area, SeoulRegion[]>> = {
  서울: [
    { id: 1, name: '서울 전체', count: 1234 },
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

const AreaPopover = () => {
  const [selectedArea, setSelectedArea] = useState<(typeof areas)[0]['name']>('전국');
  const [checkedSubAreas, setCheckedSubAreas] = useState<Record<string, boolean>>({});

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
        css={triggerStyle}
        style={{
          color: isSelected ? theme.colors.text01 : theme.colors.text06,
          backgroundColor: isSelected ? theme.colors.field09 : theme.colors.field01,
        }}
      >
        <span>{isSelected ? `${selectedArea} . ` : '지역'}</span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content css={popoverStyle}>
          <div css={contentWrapper}>
            <div css={areaListStyle}>
              {areas.map((area) => (
                <button
                  key={area.id}
                  css={[areaButtonStyle, area.name === selectedArea && selectedAreaStyle]}
                  onClick={() => handleAreaClick(area.name)}
                >
                  {area.name} {area.count}
                </button>
              ))}
            </div>
            <div css={subAreaListStyle}>
              {selectedArea ? (
                subAreas[selectedArea]?.map((subArea) => (
                  <label key={subArea.id} css={subAreaItemStyle}>
                    <input
                      type="checkbox"
                      checked={!!checkedSubAreas[subArea.name]}
                      onChange={() => handleSubAreaCheck(subArea.name)}
                    />
                    <span>
                      {subArea.name} {subArea.count}
                    </span>
                  </label>
                ))
              ) : (
                <div css={placeholderStyle}>지역을 먼저 선택해 주세요</div>
              )}
            </div>
          </div>
          <div css={footerStyle}>
            <button
              css={resetButtonStyle}
              onClick={() => {
                setSelectedArea('전국');
              }}
            >
              초기화
            </button>
            <button css={saveButtonStyle}>저장</button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AreaPopover;

const triggerStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.4rem;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
`;

const popoverStyle = css`
  width: 36.4rem;
  height: 35rem;
  padding: 16px;
  background-color: white;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  overflow: scroll;
`;

const contentWrapper = css`
  display: flex;
  gap: 16px;
`;

const areaListStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const areaButtonStyle = css`
  padding: 0.8rem;
  border: none;
  background-color: #f4f4f4;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
`;

const selectedAreaStyle = css`
  background-color: #e8e8e8;
  font-weight: bold;
`;

const subAreaListStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const subAreaItemStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    margin-right: 8px;
  }
`;

const placeholderStyle = css`
  text-align: center;
  color: #aaa;
  margin-top: 8px;
`;

const footerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const resetButtonStyle = css`
  padding: 0.8rem 1.2rem;
  background-color: #f4f4f4;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const saveButtonStyle = css`
  padding: 0.8rem 1.2rem;
  background-color: #4caf50;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;
