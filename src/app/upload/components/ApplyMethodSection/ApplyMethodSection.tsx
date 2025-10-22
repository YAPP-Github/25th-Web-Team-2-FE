import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  addContactInfoContainer,
  ageInputContainer,
  alarmAgreeContainer,
  applyMethodContainer,
  applyMethodContentLayout,
  applyMethodSectionLayout,
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
import TextAreaForm from '../TextAreaForm/TextAreaForm';
import { headingIcon, label } from '../UploadContainer/UploadContainer.css';

import { GENDER_TYPE } from '@/app/post/[postId]/ExperimentPostPage.types';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

interface ApplyMethodSectionProps {
  addLink: boolean;
  setAddLink: Dispatch<SetStateAction<boolean>>;
  addContact: boolean;
  setAddContact: Dispatch<SetStateAction<boolean>>;
}

const TEXTAREA_HEIGHT = 98;

const ApplyMethodSection = ({
  addLink,
  setAddLink,
  addContact,
  setAddContact,
}: ApplyMethodSectionProps) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');

  const { control, setValue, formState } = useFormContext<UploadExperimentPostSchemaType>();

  const ageError = !!(
    formState.errors?.targetGroupInfo?.startAge || formState.errors?.targetGroupInfo?.endAge
  );
  const emptyMessage =
    formState.errors.targetGroupInfo?.startAge?.message === '' &&
    formState.errors.targetGroupInfo?.endAge?.message === '';

  return (
    <section className={applyMethodSectionLayout}>
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
              <TextAreaForm
                id="applyMethodInfo.content"
                placeholder="참여자에게 신청 방법을 알려주세요 (예: 링크로 폼 제출해 주세요)"
                maxLength={200}
                field={field}
                error={fieldState.error}
                height={TEXTAREA_HEIGHT}
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
                    field={field}
                    id="applyMethodInfo.formUrl"
                    placeholder="https://"
                    maxLength={100}
                    size="full"
                    error={fieldState.error}
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
                    field={field}
                    id="applyMethodInfo.phoneNum"
                    placeholder="연락처, 이메일 등"
                    error={fieldState.error}
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
            <div className={ageInputContainer({ isError: ageError })}>
              <span className={textStyle}>만</span>
              <Controller
                name="targetGroupInfo.startAge"
                control={control}
                render={({ field }) => <AgeForm id="startAge" placeholder="00" field={field} />}
              />
              <span className={textStyle}>~</span>
              <Controller
                name="targetGroupInfo.endAge"
                control={control}
                render={({ field }) => <AgeForm id="endAge" placeholder="00" field={field} />}
              />
              <span className={textStyle}>세</span>
            </div>
            {ageError && !emptyMessage && (
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
                  field={field}
                  options={[
                    { value: GENDER_TYPE.MALE, label: '남성' },
                    { value: GENDER_TYPE.FEMALE, label: '여성' },
                    { value: GENDER_TYPE.ALL, label: '무관' },
                  ]}
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
                <TextAreaForm
                  id="targetGroupInfo.otherCondition"
                  placeholder="기타 조건을 입력해 주세요 (선택)"
                  maxLength={300}
                  field={{ ...field, value: field.value ?? '' }}
                  error={fieldState.error}
                  height={TEXTAREA_HEIGHT}
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
    </section>
  );
};

export default ApplyMethodSection;
