import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { disabledInput, outlineFormLayout, uploadInputContainer } from './OutlineSection.css';
import { countSelectOptions, durationMinutesOptions } from '../../upload.constants';
import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import InputForm from '../InputForm/InputForm';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import RegionPopover from '../RegionPopover/RegionPopover';
import SelectForm from '../SelectForm/SelectForm';
import {
  headingIcon,
  label,
  uploadFormSectionTitle,
  uploadSectionLayout,
} from '../UploadContainer/UploadContainer.css';

import DatePickerForm from '@/app/upload/components/DatePickerForm/DatePickerForm';
import { colors } from '@/styles/colors';
import { MatchType } from '@/types/uploadExperimentPost';

const OutlineSection = () => {
  const { control, setValue } = useFormContext();

  // 실험 일시 및 소요시간 본문 참고 여부
  const [experimentDateChecked, setExperimentDateChecked] = useState(false);
  const [durationChecked, setDurationChecked] = useState(false);

  // 대면 방식
  const selectedMatchType = useWatch({ control, name: 'matchType' });

  // 실험 장소 지역구 선택
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [isOpenRegionPopover, setIsOpenRegionPopover] = useState(false);

  // 유저 선택에 따라 재검증 및 null 처리
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);

    setValue('region', region, { shouldValidate: true });
    setValue('area', '', { shouldValidate: true });
  };

  const handleSubRegionSelect = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
    setIsOpenRegionPopover(false);

    setValue('area', subRegion, { shouldValidate: true });
  };

  const handleMatchTypeChange = (value: MatchType) => {
    setValue('matchType', value, { shouldValidate: true });

    if (value === MatchType.ONLINE) {
      setValue('region', null, { shouldValidate: true });
      setValue('area', null, { shouldValidate: true });
      setValue('univName', null, { shouldValidate: true });
    } else {
      setValue('region', '', { shouldValidate: true });
      setValue('area', '', { shouldValidate: true });
      setValue('univName', '', { shouldValidate: true });
    }
  };

  const handleDurationCheckboxChange = () => {
    const newCheckedState = !durationChecked;
    setDurationChecked(newCheckedState);

    if (newCheckedState) {
      setValue('timeRequired', null, { shouldValidate: true });
    } else {
      setValue('timeRequired', '', { shouldValidate: true });
    }
  };

  const regionPopoverProps = {
    isOpenRegionPopover,
    onOpenRegionPopover: setIsOpenRegionPopover,
    selectedRegion,
    selectedSubRegion,
    onRegionSelect: handleRegionSelect,
    onSubRegionSelect: handleSubRegionSelect,
  };

  return (
    <div className={uploadSectionLayout}>
      <h3 className={uploadFormSectionTitle}>
        <span className={headingIcon}>1</span>실험의 개요를 알려주세요{' '}
        <span style={{ color: `${colors.textAlert}` }}>*</span>
      </h3>

      <div className={outlineFormLayout}>
        {/* 연구 책임자 */}
        <div>
          <label className={label} htmlFor="leadResearcher">
            연구 책임자
          </label>
          <Controller
            name="leadResearcher"
            control={control}
            render={({ field, fieldState }) => (
              <InputForm
                id="leadResearcher"
                field={field}
                type="text"
                placeholder="OO대학교 OO학과 OO연구실 OOO"
                fieldState={fieldState}
              />
            )}
          />
        </div>

        {/* 실험 일시 */}
        <div>
          <p className={label}>실험 일시</p>

          {/* 날짜 선택 */}
          <Controller
            name="startDate"
            control={control}
            render={({ field, fieldState }) => (
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
                      field={field}
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
          <p className={label}>진행 방식</p>

          <Controller
            name="matchType"
            control={control}
            render={({ field, fieldState }) => (
              <RadioButtonGroup<MatchType>
                options={[
                  { value: MatchType.OFFLINE, label: '대면' },
                  { value: MatchType.ONLINE, label: '비대면' },
                  { value: MatchType.HYBRID, label: '대면+비대면' },
                ]}
                selectedValue={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleMatchTypeChange(value);
                }}
                isError={!!fieldState.error}
              />
            )}
          />
        </div>

        {/* 참여 보상 */}
        <div>
          <label className={label} htmlFor="reward">
            참여 보상
          </label>
          <Controller
            name="reward"
            control={control}
            render={({ field, fieldState }) => (
              <InputForm
                id="reward"
                field={field}
                fieldState={fieldState}
                placeholder="예) 현금 10,000원"
                type="text"
              />
            )}
          />
        </div>

        {/* 실험 장소 */}
        <div>
          <label className={label} htmlFor="location">
            실험 장소
          </label>
          {selectedMatchType === MatchType.ONLINE ? (
            <div className={disabledInput}>비대면</div>
          ) : (
            <div className={uploadInputContainer}>
              <Controller
                name="univName"
                control={control}
                render={({ field, fieldState }) => (
                  <InputForm
                    id="univName"
                    field={field}
                    placeholder="대학교 입력"
                    fieldState={fieldState}
                    showErrorMessage={false}
                  />
                )}
              />
              {/* 지역구 선택 */}
              <Controller
                name="region"
                control={control}
                rules={{ required: '지역을 선택해 주세요' }}
                render={({ fieldState, field }) => (
                  <Controller
                    name="area"
                    control={control}
                    rules={{ required: '지역구를 선택해 주세요' }}
                    render={({ fieldState: areaFieldState }) => (
                      <RegionPopover
                        regionPopoverProps={{
                          ...regionPopoverProps,
                          error: fieldState.error || areaFieldState.error,
                          field,
                        }}
                      />
                    )}
                  />
                )}
              />

              {/* 상세 주소 입력 */}
              <Controller
                name="detailedAddress"
                control={control}
                render={({ field, fieldState }) => (
                  <InputForm
                    id="detailedAddress"
                    field={field}
                    placeholder="상세 주소 입력 (선택)"
                    maxLength={70}
                    fieldState={fieldState}
                  />
                )}
              />
            </div>
          )}
        </div>

        {/* 소요 시간 */}
        <div>
          <p className={label}>소요 시간</p>

          <div className={uploadInputContainer}>
            {/* 실험 횟수 */}
            <div>
              <Controller
                name="count"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectForm
                    field={field}
                    fieldState={fieldState}
                    options={countSelectOptions}
                    placeholder="실험 횟수 입력"
                    disabled={false}
                    showErrorMessage={false}
                  />
                )}
              />
            </div>

            {/* 소요 시간 */}
            <>
              <div>
                <Controller
                  name="timeRequired"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectForm
                      field={field}
                      fieldState={fieldState}
                      options={durationMinutesOptions}
                      placeholder="1회당 시간 입력"
                      disabled={durationChecked}
                      showErrorMessage={false}
                    />
                  )}
                />
              </div>

              {/* 본문 참고 체크박스 */}
              <CheckboxWithIcon
                checked={durationChecked}
                onChange={handleDurationCheckboxChange}
                label="본문 참고"
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlineSection;
