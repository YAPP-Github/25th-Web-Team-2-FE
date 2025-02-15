import Link from 'next/link';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  badge,
  headerContainer,
  infoContainer,
  title,
  titleContainer,
  verticalLine,
  leaveButton,
  emailWrapper,
  updateButton,
  areaFilterContainer,
  termContainer,
  updateInfoFormContainer,
  updateInfoForm,
} from './ParticipantUserInfo.css';
import useFormParticipantUserInfo from '../../hooks/useFormParticipantUserInfo';

import { ParticipantResponse } from '@/apis/login';
import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import AreaTooltip from '@/app/join/components/Participant/JoinInfoStep/AreaTooltip/AreaTooltip';
import {
  filterTitle,
  filterTitleWrapper,
  joinAreaFilterWrapper,
  requiredStar,
} from '@/app/join/components/Participant/JoinInfoStep/JoinInfoStep.css';
import JoinSelect from '@/app/join/components/Participant/JoinInfoStep/JoinSelect/JoinSelect';
import RadioButtonGroupContainer from '@/app/join/components/Participant/JoinInfoStep/RadioButtonGroupContainer/RadioButtonGroupContainer';
import { JOIN_REGION, JOIN_SUB_REGION } from '@/app/join/JoinPage.constants';
import { MatchType } from '@/app/join/JoinPage.types';
import Icon from '@/components/Icon';

const GENDER_LABEL = {
  MALE: '남성',
  FEMALE: '여성',
} as const;

const ParticipantUserInfo = ({ userInfo }: { userInfo: ParticipantResponse }) => {
  const { form, region, additionalRegion, handleSubmit, isLoading } = useFormParticipantUserInfo({
    userInfo,
  });

  const { memberInfo } = userInfo;
  const [isToastOpen, setIsToastOpen] = useState(false);

  // TODO: API 수정 시 체크 상태 form으로 관리
  const [serviceAgreeCheck, setServiceAgreeCheck] = useState({
    isAdvertise: false,
    isRecommend: false,
  });

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setServiceAgreeCheck((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  return (
    <>
      <div className={headerContainer}>
        <div className={titleContainer}>
          <span className={badge}>참여자</span>
          <span className={title}>{memberInfo.name}님의 회원정보</span>
        </div>
        <div className={infoContainer}>
          <span>{GENDER_LABEL[userInfo.gender]}</span>
          <span className={verticalLine} />
          <span>{userInfo.birthDate}</span>
          <span className={verticalLine} />
          <div className={emailWrapper}>
            <span>ID</span>
            <span>{memberInfo.oauthEmail}</span>
          </div>
        </div>
      </div>
      <div className={updateInfoFormContainer}>
        <section className={updateInfoForm}>
          {/* 연락 받을 이메일 */}
          <JoinInput
            name="contactEmail"
            control={form.control}
            label="연락 받을 이메일"
            required
            placeholder="이메일 입력"
            tip="주요 안내 사항을 전달받을 이메일을 입력해 주세요. 이메일 ID와 달라도 괜찮아요"
            isTip={false}
          />

          {/* 이름 */}
          <JoinInput
            name="name"
            control={form.control}
            label="이름"
            required
            placeholder="이름(실명) 입력"
          />

          {/* 거주 지역 */}
          <div className={areaFilterContainer}>
            <div className={filterTitleWrapper}>
              <span className={filterTitle}>거주 지역</span>
              <span className={requiredStar}>*</span>
            </div>
            <div className={joinAreaFilterWrapper}>
              <Controller
                name="basicAddressInfo.region"
                control={form.control}
                render={({ field, fieldState }) => (
                  <JoinSelect
                    value={field.value}
                    onChange={(value) => form.setValue('basicAddressInfo.region', value)}
                    placeholder="시·도"
                    options={JOIN_REGION}
                    isError={Boolean(fieldState.error) && !field.value}
                  />
                )}
              />

              <Controller
                name="basicAddressInfo.area"
                control={form.control}
                render={({ field, fieldState }) => (
                  <JoinSelect
                    value={field.value}
                    onChange={(value) => form.setValue('basicAddressInfo.area', value)}
                    placeholder="시·군·구"
                    options={JOIN_SUB_REGION[region || ''] || []}
                    isError={Boolean(fieldState.error) && !field.value}
                  />
                )}
              />
            </div>
          </div>

          {/* 추가 활동 지역 */}
          <div className={areaFilterContainer}>
            <div className={filterTitleWrapper}>
              <span className={filterTitle}>추가 활동 지역</span>
              <AreaTooltip />
            </div>
            <div className={areaFilterContainer}>
              <div className={joinAreaFilterWrapper}>
                <Controller
                  name="additionalAddressInfo.region"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <JoinSelect
                      value={field.value}
                      onChange={(value) => form.setValue('additionalAddressInfo.region', value)}
                      placeholder="시·도"
                      options={JOIN_REGION}
                      isError={Boolean(fieldState.error)}
                    />
                  )}
                />

                <Controller
                  name="additionalAddressInfo.area"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <JoinSelect
                      value={field.value}
                      onChange={(value) => form.setValue('additionalAddressInfo.area', value)}
                      placeholder="시·군·구"
                      options={JOIN_SUB_REGION[additionalRegion || ''] || []}
                      isError={Boolean(fieldState.error)}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* 선호 실험 진행 방식 */}
          <RadioButtonGroupContainer<MatchType>
            control={form.control}
            name="matchType"
            title="선호 실험 진행 방식"
            options={[
              { value: 'ALL', label: '전체' },
              { value: 'OFFLINE', label: '대면' },
              { value: 'ONLINE', label: '비대면' },
            ]}
            onChange={(value) => form.setValue('matchType', value)}
          />

          <div className={termContainer}>
            <JoinCheckbox
              label="[선택] 광고성 정보 이메일/SMS 수신 동의"
              isChecked={serviceAgreeCheck.isAdvertise}
              onChange={(e) => handleChangeCheck(e, 'isAdvertise')}
              isArrow={false}
              emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" />}
            />
            <JoinCheckbox
              label="[선택] 개인정보 수집 및 이용 동의-실험 추천·혜택"
              isChecked={serviceAgreeCheck.isRecommend}
              onChange={(e) => handleChangeCheck(e, 'isRecommend')}
              isArrow={false}
              emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" />}
            />
          </div>
        </section>
        <Link href={`/user/profile/leave`} className={leaveButton}>
          <span>회원탈퇴</span>
          <Icon icon="Chevron" rotate={-90} />
        </Link>
      </div>

      <button
        className={updateButton}
        onClick={handleSubmit(() => setIsToastOpen(true))}
        disabled={isLoading}
      >
        {isLoading ? '저장중...' : '저장하기'}
      </button>

      <EmailToast
        title="회원정보가 수정되었어요"
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </>
  );
};

export default ParticipantUserInfo;
