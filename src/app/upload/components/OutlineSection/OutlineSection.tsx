import { css, Theme } from '@emotion/react';
import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { headingIcon, input, label } from '../UploadContainer/UploadContainer';

import DatePickerField from '@/app/upload/components/DatePickerField/DatePickerField';
import { UPLOAD_REGION } from '@/constants/uploadRegion';
import { colors } from '@/styles/colors';

enum MatchType {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

const OutlineSection = () => {
  const [experimentDateChecked, setExperimentDateChecked] = useState(false);
  const [rewardChecked, setRewardChecked] = useState(false);
  const [timeChecked, setTimeChecked] = useState(false);

  const [selectedMatchType, setSelectedMatchType] = useState<MatchType | null>(null);

  const handleMatchTypeChange = (method: MatchType) => {
    setSelectedMatchType(method);
  };

  // todo react-hook-form 연결 시 controller로 관리할 값
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDates, setSelectedDates] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateChange = (dates: DateRange) => {
    setSelectedDates(dates);
  };

  // 실험 장소 지역구 선택
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [isOpenRegionPopover, setIsOpenRegionPopover] = useState(false);

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
  };

  const handleSubRegionSelect = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
    setIsOpenRegionPopover(false);
  };

  // 팝오버 선택 시 기본으로 보여주는 데이터
  const defaultRegionData = UPLOAD_REGION.find((region) => region.value === 'SEOUL') || null;

  const regionData = selectedRegion
    ? UPLOAD_REGION.find((region) => region.value === selectedRegion) || null
    : defaultRegionData;

  return (
    <div css={outlineLayout}>
      <h3>
        <span css={headingIcon}>1</span>실험의 개요를 알려주세요
      </h3>

      <form css={outlineFormLayout}>
        {/* 연구 책임자 */}
        <div>
          <label css={label} htmlFor="researcher">
            연구 책임자 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <input
            css={input}
            type="text"
            id="researcher"
            placeholder="OO대학교 OO학과 OO연구실 OOO"
          />
        </div>

        {/* 실험 일시 */}
        <div>
          <label css={label} htmlFor="experiment-date">
            실험 일시 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <DatePickerField
            placeholder="실험 시작일 ~ 실험 종료일"
            onDateChange={handleDateChange}
            experimentDateChecked={experimentDateChecked}
          />
          <CheckboxWithIcon
            checked={experimentDateChecked}
            onChange={() => {
              setExperimentDateChecked((prev) => !prev);
            }}
            label="본문 참고"
          />
        </div>

        {/* 진행 방식 */}
        <div>
          <label css={label}>
            진행 방식 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>

          <RadioButtonGroup<MatchType>
            options={[
              { value: MatchType.OFFLINE, label: '대면' },
              { value: MatchType.ONLINE, label: '비대면' },
              { value: MatchType.HYBRID, label: '대면+비대면' },
            ]}
            selectedValue={selectedMatchType}
            onChange={handleMatchTypeChange}
          />
        </div>

        {/* 참여 보상 */}
        <div>
          <label css={label} htmlFor="reward">
            참여 보상 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <input
            css={input}
            type="text"
            id="reward"
            placeholder={rewardChecked ? '본문 참고' : '예) 현금 10,000원'}
            disabled={rewardChecked}
          />
          <CheckboxWithIcon
            checked={rewardChecked}
            onChange={() => {
              setRewardChecked((prev) => !prev);
            }}
            label="본문 참고"
          />
        </div>

        {/* 실험 장소 */}
        <div>
          <label css={label} htmlFor="location">
            실험 장소 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <div css={inputContainer}>
            <input css={input} type="text" id="location" placeholder="대학교 입력" />

            {/* 지역구 선택 */}
            {/* PopoverField */}
            <Popover.Root open={isOpenRegionPopover} onOpenChange={setIsOpenRegionPopover}>
              <Popover.Trigger asChild>
                <input
                  css={(theme) => [input, popoverInput(theme, isOpenRegionPopover)]}
                  type="text"
                  id="location"
                  placeholder="지역구 선택"
                  value={
                    selectedRegion && selectedSubRegion
                      ? `${regionData?.label} ${selectedSubRegion}`
                      : ''
                  }
                  readOnly
                />
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content sideOffset={6} css={popoverContent}>
                  <div css={popoverLayout}>
                    {/* 지역 */}
                    <div css={regionList}>
                      {UPLOAD_REGION.map((region) => (
                        <button
                          key={region.value}
                          css={[
                            regionButton,
                            selectedRegion === region.value && activeRegionButton,
                          ]}
                          onClick={() => handleRegionSelect(region.value)}
                        >
                          {region.label}
                        </button>
                      ))}
                    </div>

                    {/* 시 / 구 / 군 */}
                    <div css={subRegionList}>
                      {regionData?.children.map((subRegion) => (
                        <button
                          key={subRegion.value}
                          css={[
                            subRegionButton,
                            selectedSubRegion === subRegion.label && activeRegionButton,
                          ]}
                          onClick={() => handleSubRegionSelect(subRegion.label)}
                        >
                          {subRegion.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>

        {/* 소요 시간 */}
        <div>
          <label css={label} htmlFor="time">
            소요 시간 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <div css={radioGroup}>
            <input css={input} type="text" id="frequency" placeholder="실험 횟수 입력" />
            <input
              css={input}
              type="text"
              id="duration"
              placeholder={timeChecked ? '본문 참고' : '1회당 시간 입력'}
              disabled={timeChecked}
            />
          </div>
          <CheckboxWithIcon
            checked={timeChecked}
            onChange={() => {
              setTimeChecked((prev) => !prev);
            }}
            label="본문 참고"
          />
        </div>
      </form>
    </div>
  );
};

export default OutlineSection;

export const outlineLayout = css`
  height: 57.6rem;
`;

export const outlineFormLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10.2rem 10.2rem 21.4rem;

  grid-column-gap: 3.2rem;
  grid-row-gap: 2.8rem;

  margin: 0 auto;
`;

export const radioGroup = css`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.8rem;
`;

export const customRadioGroup = css`
  display: flex;
  gap: 1rem;
`;

export const customRadioButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};

  width: 14.533rem;
  height: 4.8rem;

  padding: 1rem 2rem;

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  background-color: ${theme.colors.field01};

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.field02};
  }
`;

export const activeRadioButton = (theme: Theme) => css`
  border: 0.1rem solid ${theme.colors.lineTinted};

  background-color: ${theme.colors.primaryTinted};
  color: ${theme.colors.textPrimary};

  &:hover {
    background-color: ${theme.colors.primaryTinted};
  }
`;

const popoverInput = (theme: Theme, isOpenRegionPopover: boolean) => css`
  border: 0.1em solid ${isOpenRegionPopover ? theme.colors.lineTinted : theme.colors.line01};
`;

const popoverContent = (theme: Theme) => css`
  width: 45.2rem;
  height: 30.6rem;

  padding: 2.2rem 1.6rem;

  background: ${theme.colors.field01};

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
`;

const popoverLayout = css`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;

  height: 100%;

  position: relative;
`;

const regionList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;

  width: 11.2rem;

  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 12.4rem;
    transform: translateY(-50%);
    width: 0.1rem;
    height: 26rem;
    background-color: ${theme.colors.line02};
  }
`;

const subRegionList = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const commonRegionButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  height: 3.4rem;

  border-radius: 1.2rem;
  text-align: left;

  &:hover {
    background-color: ${theme.colors.field02};
  }
`;

const regionButton = (theme: Theme) => css`
  ${commonRegionButton(theme)};

  padding: 0.6rem 1.2rem;
`;

const subRegionButton = (theme: Theme) => css`
  ${commonRegionButton(theme)};

  padding: 0.6rem 0.8rem;
`;

const activeRegionButton = (theme: Theme) => css`
  background-color: ${theme.colors.primaryTinted};
  border: 0.1rem solid ${theme.colors.lineTinted};
  color: ${theme.colors.textPrimary};
`;

const inputContainer = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;
