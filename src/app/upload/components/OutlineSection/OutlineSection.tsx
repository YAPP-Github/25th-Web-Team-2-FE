import { css, Theme } from '@emotion/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import CountSelect from '../CountSelect/CountSelect';
import DurationSelect from '../DurationSelect/DurationSelect';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import RegionPopover from '../RegionPopover/RegionPopover';
import { TextInput } from '../TextInput/TextInput';
import { headingIcon, input, label } from '../UploadContainer/UploadContainer';

import DatePickerField from '@/app/upload/components/DatePickerField/DatePickerField';
import { colors } from '@/styles/colors';

export enum MatchType {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

const OutlineSection = () => {
  const [experimentDateChecked, setExperimentDateChecked] = useState(false);
  const [durationChecked, setDurationChecked] = useState(false);

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

  const regionPopoverProps = {
    isOpenRegionPopover,
    onOpenRegionPopover: setIsOpenRegionPopover,
    selectedRegion,
    selectedSubRegion,
    onRegionSelect: handleRegionSelect,
    onSubRegionSelect: handleSubRegionSelect,
  };

  // 소요 시간
  const [countValue, setCountValue] = useState<string | undefined>(undefined);
  const [durationValue, setDurationValue] = useState<string | undefined>(undefined);

  return (
    <div>
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
          <input css={input} type="text" id="reward" placeholder={'예) 현금 10,000원'} />
        </div>

        {/* 실험 장소 */}
        <div>
          <label css={label} htmlFor="location">
            실험 장소 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          {selectedMatchType === MatchType.ONLINE ? (
            <div css={[input, disabledInput]}>비대면</div>
          ) : (
            <div css={inputContainer}>
              <input css={input} type="text" id="location" placeholder="대학교 입력" />
              {/* 지역구 선택 */}
              <RegionPopover regionPopoverProps={regionPopoverProps} />

              <TextInput id="detail-location" placeholder="상세 주소 입력 (선택)" maxLength={70} />
            </div>
          )}
        </div>

        {/* 소요 시간 */}
        <div>
          <p css={label}>
            소요 시간 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </p>

          <div css={inputContainer}>
            <CountSelect value={countValue} onChange={setCountValue} />
            <DurationSelect
              value={durationValue}
              onChange={setDurationValue}
              referToDetailsChecked={durationChecked}
            />
            <CheckboxWithIcon
              checked={durationChecked}
              onChange={() => setDurationChecked((prev) => !prev)}
              label="본문 참고"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OutlineSection;

export const outlineFormLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10.2rem 10.2rem auto;

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

const inputContainer = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;

export const disabledInput = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  color: ${theme.colors.text02};
`;
