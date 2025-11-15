import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  disabledInput,
  isEndDatePastText,
  outlineFormLayout,
  uploadInputContainer,
  uploadSelectInputContainer,
  outlineSectionLayout,
  uploadFormSectionHeader,
} from './OutlineSection.css';
import { useExperimentDate } from '../../hooks/useExperimentDate';
import { useExperimentDuration } from '../../hooks/useExperimentDuration';
import useMatchType from '../../hooks/useMatchType';
import useRegionSelect from '../../hooks/useRegionSelect';
import useUserResearcherInfo from '../../hooks/useUserResearcherInfo';
import { countSelectOptions, durationMinutesOptions } from '../../upload.constants';
import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import ExtractKeywordButton from '../ExtractKeywordButton/ExtractKeywordButton';
import InputForm from '../InputForm/InputForm';
import { textInput } from '../InputForm/InputForm.css';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import RegionPopover from '../RegionPopover/RegionPopover';
import SelectForm from '../SelectForm/SelectForm';
import { label, uploadFormSectionTitle } from '../UploadContainer/UploadContainer.css';

import { MATCH_TYPE, MatchType } from '@/app/post/[postId]/ExperimentPostPage.types';
import DatePickerForm from '@/app/upload/components/DatePickerForm/DatePickerForm';
import UnivAutoCompleteInput from '@/components/UnivAutoCompleteInput/UnivAutoCompleteInput';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

interface OutlineSectionProps {
  experimentDateChecked?: boolean;
  durationChecked?: boolean;
  isRecruitStatus?: boolean;
  extractKeywordsFromContent?: () => Promise<void>;
  isPending?: boolean;
}

const OutlineSection = ({
  experimentDateChecked = false,
  durationChecked = false,
  isRecruitStatus = true,
  extractKeywordsFromContent,
  isPending,
}: OutlineSectionProps) => {
  const { control, setValue } = useFormContext<UploadExperimentPostSchemaType>();

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

  const isOnCampus = useWatch({ name: 'isOnCampus', control });

  return (
    <div className={outlineSectionLayout}>
      <div className={uploadFormSectionHeader}>
        <div className={uploadFormSectionTitle}>
          <h3>실험의 개요를 알려주세요&nbsp;</h3>
          <span style={{ color: `${colors.textAlert}` }}>*</span>
        </div>
        <ExtractKeywordButton onClick={extractKeywordsFromContent} isPending={isPending} />
      </div>
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
                field={field}
                id="leadResearcher"
                type="text"
                placeholder="OO대학교 OO학과 OO연구실 OOO"
                error={fieldState.error}
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
                placeholder="실험 시작일 ~ 실험 종료일"
                onDateChange={(dates) => {
                  setValue('startDate', dates.from || null, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue('endDate', dates.to || null, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                experimentDateChecked={isExperimentDateChecked}
                error={fieldState.error}
                field={field}
                initialDates={defaultDateRange}
                disabled={isEndDatePast || !isRecruitStatus}
              />
            )}
          />

          {/* 본문 참고 체크박스 */}
          {!isRecruitStatus && !isEndDatePast ? (
            <p className={isEndDatePastText}>모집 완료된 공고는 일시를 변경할 수 없어요</p>
          ) : isEndDatePast ? (
            <p className={isEndDatePastText}>실험 종료일이 지났다면 일시를 변경할 수 없어요</p>
          ) : (
            <div style={{ marginTop: '0.4rem' }}>
              <CheckboxWithIcon
                checked={isExperimentDateChecked}
                onChange={handleExperimentDateCheckboxChange}
                label="본문 참고"
              />
            </div>
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
                field={field}
                options={[
                  { value: MATCH_TYPE.OFFLINE, label: '대면' },
                  { value: MATCH_TYPE.ONLINE, label: '비대면' },
                  { value: MATCH_TYPE.ALL, label: '대면+비대면' },
                ]}
                onChange={(value) => {
                  field.onChange(value);
                  handleMatchTypeChange(value as MatchType | null);
                }}
                isError={!!fieldState.error}
              />
            )}
          />
        </div>

        {/* 실험 장소 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'row nowrap' }}>
            <label className={label} htmlFor="place">
              실험 장소
            </label>
            {selectedMatchType !== MATCH_TYPE.ONLINE && (
              <div>
                <Controller
                  name="isOnCampus"
                  control={control}
                  render={({ field }) => (
                    <CheckboxWithIcon
                      checked={field.value}
                      onChange={() => {
                        setValue('isOnCampus', !field.value, {
                          shouldValidate: true,
                        });
                      }}
                      label="교내 실험"
                      align="left"
                      size="large"
                    />
                  )}
                />
              </div>
            )}
          </div>

          {selectedMatchType === MATCH_TYPE.ONLINE ? (
            <div className={disabledInput}>비대면</div>
          ) : (
            <div className={uploadInputContainer}>
              {/* 교내실험 - 학교 선택 */}
              {isOnCampus && (
                <UnivAutoCompleteInput<UploadExperimentPostSchemaType>
                  name="place"
                  control={control}
                  required
                  placeholder="학교명 검색"
                  inputClassName={textInput.default}
                />
              )}

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
                    field={{ ...field }}
                    placeholder={isOnCampus ? '상세 주소 입력 (선택)' : '상세 주소 입력'}
                    maxLength={70}
                    error={fieldState.error}
                  />
                )}
              />
            </div>
          )}
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
                error={fieldState.error}
                placeholder="예) 현금 10,000원"
                type="text"
              />
            )}
          />
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
                    options={countSelectOptions}
                    placeholder="실험 횟수 입력"
                    disabled={false}
                    error={fieldState.error}
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
                      options={durationMinutesOptions}
                      placeholder="1회당 시간 입력"
                      disabled={isDurationChecked}
                      error={fieldState.error}
                      showErrorMessage={false}
                    />
                  )}
                />
              </div>
              {/* 본문 참고 체크박스 */}
              <div style={{ marginTop: '0.4rem' }}>
                <CheckboxWithIcon
                  checked={isDurationChecked}
                  onChange={handleDurationCheckboxChange}
                  label="본문 참고"
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlineSection;
