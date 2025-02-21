import { Controller, useFormContext } from 'react-hook-form';

import {
  disabledInput,
  isEndDatePastText,
  outlineFormLayout,
  uploadInputContainer,
  uploadSelectInputContainer,
} from './OutlineSection.css';
import { useExperimentDate } from '../../hooks/useExperimentDate';
import { useExperimentDuration } from '../../hooks/useExperimentDuration';
import useMatchType from '../../hooks/useMatchType';
import useRegionSelect from '../../hooks/useRegionSelect';
import useUserResearcherInfo from '../../hooks/useUserResearcherInfo';
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

interface OutlineSectionProps {
  experimentDateChecked?: boolean;
  durationChecked?: boolean;
}

const OutlineSection = ({
  experimentDateChecked = false,
  durationChecked = false,
}: OutlineSectionProps) => {
  const { control, setValue } = useFormContext();

  // 공고 등록 시 연구자 정보 자동 채우기
  useUserResearcherInfo();

  // 진행 방식 선택 로직
  const { selectedMatchType, handleMatchTypeChange } = useMatchType();

  // 지역 선택 로직
  const {
    isOpenRegionPopover,
    setIsOpenRegionPopover,
    selectedRegion,
    selectedSubRegion,
    handleRegionSelect,
    handleSubRegionSelect,
  } = useRegionSelect();

  // 실험 일시 선택 로직
  const {
    isExperimentDateChecked,
    isEndDatePast,
    handleExperimentDateCheckboxChange,
    defaultDateRange,
  } = useExperimentDate(experimentDateChecked);

  // 실험 소요 시간 로직
  const { isDurationChecked, handleDurationCheckboxChange } =
    useExperimentDuration(durationChecked);

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
        <span className={headingIcon}>2</span>실험의 개요를 알려주세요{' '}
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
                {...field}
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
              <DatePickerForm
                {...field}
                placeholder="실험 시작일 ~ 실험 종료일"
                onDateChange={(dates) => {
                  setValue('startDate', dates.from || null, { shouldValidate: true });
                  setValue('endDate', dates.to || null, { shouldValidate: true });
                }}
                experimentDateChecked={isExperimentDateChecked}
                error={fieldState.error}
                field={field}
                initialDates={defaultDateRange}
                disabled={isEndDatePast}
              />
            )}
          />

          {/* 본문 참고 체크박스 */}
          {isEndDatePast ? (
            <p className={isEndDatePastText}>실험 종료일이 지났다면 일시를 변경할 수 없어요</p>
          ) : (
            <CheckboxWithIcon
              checked={isExperimentDateChecked}
              onChange={handleExperimentDateCheckboxChange}
              label="본문 참고"
            />
          )}
        </div>

        {/* 진행 방식 */}
        <div>
          <p className={label}>진행 방식</p>

          <Controller
            name="matchType"
            control={control}
            render={({ field, fieldState }) => (
              <RadioButtonGroup
                {...field}
                options={[
                  { value: MatchType.OFFLINE, label: '대면' },
                  { value: MatchType.ONLINE, label: '비대면' },
                  { value: MatchType.ALL, label: '대면+비대면' },
                ]}
                selectedValue={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleMatchTypeChange(value as MatchType | null);
                }}
                isError={!!fieldState.error}
                ref={field.ref}
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
                {...field}
                id="reward"
                field={field}
                fieldState={fieldState}
                placeholder="예) 현금 10,000원"
                type="text"
                showErrorMessage={true}
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
                name="place"
                control={control}
                render={({ field, fieldState }) => (
                  <InputForm
                    {...field}
                    id="place"
                    field={field}
                    placeholder="장소 입력"
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

          <div className={uploadSelectInputContainer}>
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
                    ref={field.ref}
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
                      disabled={isDurationChecked}
                      showErrorMessage={false}
                      ref={field.ref}
                    />
                  )}
                />
              </div>
              {/* 본문 참고 체크박스 */}
              <CheckboxWithIcon
                checked={isDurationChecked}
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
