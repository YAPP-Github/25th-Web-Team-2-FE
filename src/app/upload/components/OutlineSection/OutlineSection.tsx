import { css, Theme } from '@emotion/react';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import CountSelect from '../CountSelect/CountSelect';
import DurationSelect from '../DurationSelect/DurationSelect';
import InputForm from '../InputForm/InputForm';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import RegionPopover from '../RegionPopover/RegionPopover';
import { TextInput } from '../TextInput/TextInput';
import { headingIcon, input, label } from '../UploadContainer/UploadContainer';

import DatePickerForm from '@/app/upload/components/DatePickerForm/DatePickerForm';
import { colors } from '@/styles/colors';
import { MatchType } from '@/types/uploadExperimentPost';

const OutlineSection = () => {
  const { control, setValue, formState } = useFormContext();
  const formData = useWatch({ control });
  console.log('formData >> ', formData);
  console.log('errors>> ', formState.errors);

  // todo useReducer로 리팩토링
  const [experimentDateChecked, setExperimentDateChecked] = useState(false);
  const [durationChecked, setDurationChecked] = useState(false);

  // 대면 방식
  const selectedMatchType = useWatch({ control, name: 'matchType' });

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

      <div css={outlineFormLayout}>
        {/* 연구 책임자 */}
        <div>
          <label css={label} htmlFor="leadResearcher">
            연구 책임자 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </label>
          <Controller
            name="leadResearcher"
            control={control}
            rules={{ required: '연구 책임자는 필수 항목입니다.' }}
            render={({ field, fieldState }) => (
              <>
                <InputForm
                  id="leadResearcher"
                  field={field}
                  css={input}
                  type="text"
                  placeholder="OO대학교 OO학과 OO연구실 OOO"
                  fieldState={fieldState}
                />
              </>
            )}
          />
        </div>

        {/* 실험 일시 */}
        <div>
          <p css={label}>
            실험 일시 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </p>

          {/* 날짜 선택 */}
          <Controller
            name="startDate"
            control={control}
            render={({ fieldState }) => (
              <Controller
                name="endDate"
                control={control}
                render={() => (
                  <>
                    <DatePickerForm
                      placeholder="실험 시작일 ~ 실험 종료일"
                      onDateChange={(dates) => {
                        setValue('startDate', dates.from || null, { shouldValidate: true });
                        setValue('endDate', dates.to || null, { shouldValidate: true });
                      }}
                      experimentDateChecked={experimentDateChecked}
                      error={fieldState.error}
                    />
                  </>
                )}
              />
            )}
          />

          {/* 본문 참고 체크박스 */}
          <CheckboxWithIcon
            checked={experimentDateChecked}
            onChange={() => {
              const newCheckedState = !experimentDateChecked;
              setExperimentDateChecked(newCheckedState);
              if (newCheckedState) {
                setValue('startDate', null);
                setValue('endDate', null);
              } else {
                setValue('startDate', undefined);
                setValue('endDate', undefined);
              }
            }}
            label="본문 참고"
          />
        </div>
        {/* 진행 방식 */}
        <div>
          <p css={label}>
            진행 방식 <span style={{ color: `${colors.textAlert}` }}>*</span>
          </p>

          <Controller
            name="matchType"
            control={control}
            rules={{ required: '진행 방식을 선택해주세요.' }}
            render={({ field, fieldState }) => (
              <RadioButtonGroup<MatchType>
                options={[
                  { value: MatchType.OFFLINE, label: '대면' },
                  { value: MatchType.ONLINE, label: '비대면' },
                  { value: MatchType.HYBRID, label: '대면+비대면' },
                ]}
                selectedValue={field.value}
                onChange={(value) => field.onChange(value)}
                isError={!!fieldState.error} // 에러 상태 전달
              />
            )}
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
      </div>
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
