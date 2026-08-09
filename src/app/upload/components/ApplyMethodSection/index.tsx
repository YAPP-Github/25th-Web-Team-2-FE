import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { closeButton, dialogOverlay } from '@/app/post/[postId]/ExperimentPostPage.css';
import Button from '@/components/common/Button';
import Icon from '@/components/Icon';
import { mobileNotReadyModalImage } from '@/components/MobileNotReadyModal/MobileNotReadyModal.css';
import { CLICK_FAKE_SCHEDULE, VIEW_FAKE_SCHEDULE } from '@/lib/mixpanel/fakeScheduleEvents';
import { trackEvent } from '@/lib/mixpanelClient';
import NotReadyMobile from '@assets/images/notReadyMobile.svg';
import { GENDER } from '@constants/user';
import { UploadExperimentPostSchemaType } from '@schema/upload/uploadExperimentPostSchema';
import { colors } from '@styles/colors';

import {
  addContactInfoContainer,
  ageInputContainer,
  applyMethodContainer,
  applyMethodTitleContainer,
  applyMethodContentLayout,
  applyMethodSectionLayout,
  disabledAlarmAgreeText,
  targetConditionLayout,
  targetGroupContainer,
  textStyle,
  uploadFormSectionTitle,
  fakeScheduleButton,
  alertModalDescription,
  alertModalContent,
} from './ApplyMethodSection.css';
import AgeForm from '../AgeForm';
import { AlarmAgreeSection } from '../AlarmAgreeSection';
import CheckboxWithIcon from '../CheckboxWithIcon';
import InputForm from '../InputForm';
import { formMessage } from '../InputForm/InputForm.css';
import RadioButtonGroup from '../RadioButtonGroup';
import TextAreaForm from '../TextAreaForm';
import { label } from '../UploadContainer/UploadContainer.css';

const TEXTAREA_HEIGHT = 98;

const ApplyMethodSection = () => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');

  const { control, setValue, formState } = useFormContext<UploadExperimentPostSchemaType>();

  const addLink = useWatch({ control, name: 'addLink' });
  const addContact = useWatch({ control, name: 'addContact' });

  const ageError = !!(
    formState.errors?.targetGroupInfo?.startAge || formState.errors?.targetGroupInfo?.endAge
  );
  const emptyMessage =
    formState.errors.targetGroupInfo?.startAge?.message === '' &&
    formState.errors.targetGroupInfo?.endAge?.message === '';

  const [openFakeScheduleAlertDialog, setOpenFakeScheduleAlertDialog] = useState(false);

  const handleClickFakeScheduleButton = () => {
    trackEvent(CLICK_FAKE_SCHEDULE);
    setOpenFakeScheduleAlertDialog(true);
  };

  useEffect(() => {
    trackEvent(VIEW_FAKE_SCHEDULE);
  }, []);

  return (
    <>
      <section className={applyMethodSectionLayout}>
        {/* 실험 참여 방법 */}
        <div className={applyMethodContainer}>
          <div className={applyMethodTitleContainer}>
            <h3 className={uploadFormSectionTitle}>
              어떤 방법으로 신청을 받을까요?&nbsp;<span style={{ color: colors.textAlert }}>*</span>
            </h3>

            <button className={fakeScheduleButton} onClick={handleClickFakeScheduleButton}>
              990원에 일정까지 만들기
            </button>
          </div>

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
                  setValue('addLink', !addLink);
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
                  setValue('addContact', !addContact);
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
          어떤 사람들을 모집하나요?&nbsp;<span style={{ color: colors.textAlert }}>*</span>
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
                      { value: GENDER.MALE, label: '남성' },
                      { value: GENDER.FEMALE, label: '여성' },
                      { value: GENDER.ALL, label: '무관' },
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
        <AlarmAgreeSection control={control} isEdit={isEdit} />

        {isEdit && (
          <p className={disabledAlarmAgreeText}>등록된 공고는 공고 알림 여부를 수정할 수 없어요</p>
        )}
      </section>

      <Dialog.Root open={openFakeScheduleAlertDialog} onOpenChange={setOpenFakeScheduleAlertDialog}>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content
          className={alertModalContent}
          onPointerDownOutside={() => setOpenFakeScheduleAlertDialog(false)}
        >
          <Dialog.Close asChild>
            <button
              className={closeButton}
              aria-label="모달 닫기"
              onClick={() => setOpenFakeScheduleAlertDialog(false)}
            >
              <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
            </button>
          </Dialog.Close>
          <Dialog.Description>
            <span className={alertModalDescription}>
              {`참여자와의 일정 조율 기능은 준비 중이에요\n완성되면 가장 먼저 알려드릴게요!`}
            </span>
            <div className={mobileNotReadyModalImage}>
              <Image
                src={NotReadyMobile}
                alt="모바일 버전 화면 준비중"
                width={144}
                height={144}
                style={{
                  objectFit: 'contain',
                  height: 'auto',
                }}
                quality={100}
              />
            </div>
          </Dialog.Description>
          <Dialog.Close asChild>
            <Button variant="primary" size="medium">
              이어서 공고 등록하기
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default ApplyMethodSection;
