import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  addContactInfoContainer,
  ageInputContainer,
  alarmAgreeContainer,
  applyMethodContainer,
  applyMethodContentLayout,
  disabledAlarmAgreeText,
  targetConditionLayout,
  targetGroupContainer,
  textStyle,
  uploadFormSectionTitle,
} from './ApplyMethodSection.css';
import AgeForm from '../AgeForm/AgeForm';
import CheckboxWithIcon from '../CheckboxWithIcon/CheckboxWithIcon';
import InputForm from '../InputForm/InputForm';
import { formMessage } from '../InputForm/InputForm.css';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { headingIcon, label, uploadSectionLayout } from '../UploadContainer/UploadContainer.css';

import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
}

interface ApplyMethodSectionProps {
  addLink: boolean;
  setAddLink: Dispatch<SetStateAction<boolean>>;
  addContact: boolean;
  setAddContact: Dispatch<SetStateAction<boolean>>;
}

const ApplyMethodSection = ({
  addLink,
  setAddLink,
  addContact,
  setAddContact,
}: ApplyMethodSectionProps) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const [isAgeFormFocused, setIsAgeFormFocused] = useState<boolean>(false);

  const { control, setValue, formState } = useFormContext<UploadExperimentPostSchemaType>();

  const ageError = !!(
    formState.errors?.targetGroupInfo?.startAge || formState.errors?.targetGroupInfo?.endAge
  );

  return (
    <div className={uploadSectionLayout}>
      {/* 실험 참여 방법 */}
      <div className={applyMethodContainer}>
        <h3 className={uploadFormSectionTitle}>
          <span className={headingIcon}>3</span>어떤 방법으로 신청을 받을까요?{' '}
          <span style={{ color: colors.textAlert }}>*</span>
        </h3>

        <div className={applyMethodContentLayout}>
          <Controller
            name="applyMethodInfo.content"
            control={control}
            render={({ field, fieldState }) => (
              <InputForm
                {...field}
                id="applyMethodInfo.content"
                placeholder="참여자에게 신청 방법을 알려주세요 (예: 링크로 폼 제출해 주세요)"
                maxLength={200}
                size="full"
                field={{ ...field, value: field.value ?? '' }}
                fieldState={fieldState}
                showErrorMessage
              />
            )}
          />
          <div className={addContactInfoContainer}>
            {/* 링크 추가 */}
            <CheckboxWithIcon
              checked={addLink}
              onChange={() => {
                setAddLink((prev) => !prev);
                setValue('applyMethodInfo.formUrl', null);
              }}
              label="링크를 추가할게요"
              align="left"
              size="large"
            />
            {addLink && (
              <Controller
                name="applyMethodInfo.formUrl"
                control={control}
                render={({ field, fieldState }) => (
                  <InputForm
                    {...field}
                    id="applyMethodInfo.formUrl"
                    placeholder="https://"
                    maxLength={100}
                    size="full"
                    field={field}
                    fieldState={fieldState}
                    showErrorMessage={true}
                  />
                )}
              />
            )}

            {/* 연락처 추가 */}
            <CheckboxWithIcon
              checked={addContact}
              onChange={() => {
                setAddContact((prev) => !prev);
                setValue('applyMethodInfo.phoneNum', null);
              }}
              label="연락처를 추가할게요"
              align="left"
              size="large"
            />
            {addContact && (
              <Controller
                name="applyMethodInfo.phoneNum"
                control={control}
                render={({ field, fieldState }) => (
                  <InputForm
                    {...field}
                    id="applyMethodInfo.phoneNum"
                    placeholder="연락처, 이메일 등"
                    size="full"
                    field={field}
                    fieldState={fieldState}
                    showErrorMessage={true}
                  />
                )}
              />
            )}
          </div>
        </div>
      </div>

      {/* 모집 조건 */}
      <h3 className={uploadFormSectionTitle}>
        <span className={headingIcon}>4</span>어떤 사람들을 모집하나요?{' '}
        <span style={{ color: colors.textAlert }}>*</span>
      </h3>
      <div className={targetConditionLayout}>
        <div className={targetGroupContainer}>
          {/* 나이 */}
          <div>
            <p className={label}>나이</p>
            <div className={ageInputContainer({ isError: ageError, isFocused: isAgeFormFocused })}>
              <span className={textStyle}>만</span>
              <Controller
                name="targetGroupInfo.startAge"
                control={control}
                render={({ field }) => (
                  <AgeForm
                    {...field}
                    id="startAge"
                    placeholder="00"
                    field={field}
                    setIsFocused={setIsAgeFormFocused}
                  />
                )}
              />
              <span className={textStyle}>~</span>
              <Controller
                name="targetGroupInfo.endAge"
                control={control}
                render={({ field }) => (
                  <AgeForm
                    {...field}
                    id="endAge"
                    placeholder="00"
                    field={field}
                    setIsFocused={setIsAgeFormFocused}
                  />
                )}
              />
              <span className={textStyle}>세</span>
            </div>
            {ageError && (
              <p className={formMessage} role="alert" aria-live="polite">
                {formState.errors.targetGroupInfo?.startAge?.message ||
                  formState.errors.targetGroupInfo?.endAge?.message}
              </p>
            )}
          </div>

          {/* 성별 */}
          <div>
            <p className={label}>성별</p>
            <Controller
              name="targetGroupInfo.genderType"
              control={control}
              render={({ field, fieldState }) => (
                <RadioButtonGroup
                  options={[
                    { value: GenderType.MALE, label: '남성' },
                    { value: GenderType.FEMALE, label: '여성' },
                    { value: GenderType.ALL, label: '무관' },
                  ]}
                  selectedValue={field.value}
                  onChange={(value) => field.onChange(value)}
                  isError={!!fieldState.error}
                />
              )}
            />
          </div>
        </div>
        {/* 기타 조건 */}
        <div>
          <label className={label} htmlFor="targetGroupInfo.otherCondition">
            기타 조건
          </label>
          <div>
            <Controller
              name="targetGroupInfo.otherCondition"
              control={control}
              render={({ field, fieldState }) => (
                <InputForm
                  {...field}
                  id="targetGroupInfo.otherCondition"
                  placeholder="기타 조건을 입력해 주세요 (선택)"
                  maxLength={300}
                  size="full"
                  field={{ ...field, value: field.value ?? '' }}
                  fieldState={fieldState}
                  showErrorMessage
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* 공고 알림 */}
      <div className={alarmAgreeContainer}>
        <Controller
          name="alarmAgree"
          control={control}
          render={({ field }) => (
            <CheckboxWithIcon
              checked={field.value}
              onChange={() => field.onChange(!field.value)}
              label="조건에 부합하는 참여자에게 해당 공고를 알릴까요?"
              align="left"
              size="large"
              boldStyle
              disabled={isEdit}
            />
          )}
        />
      </div>
      {isEdit && (
        <p className={disabledAlarmAgreeText}>등록된 공고는 공고 알림 여부를 수정할 수 없어요</p>
      )}
    </div>
  );
};

export default ApplyMethodSection;
