import Link from 'next/link';
import { Controller, FormProvider, useWatch } from 'react-hook-form';

import {
  leaveButton,
  updateButton,
  termContainer,
  updateInfoFormContainer,
  updateInfoForm,
} from './ParticipantUserInfo.css';
import useFormParticipantUserInfo from '../../../hooks/useFormParticipantUserInfo';

import { ParticipantResponse } from '@/apis/login';
import AreaTooltip from '@/app/join/components/AreaTooltip/AreaTooltip';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import RadioButtonGroupContainer from '@/app/join/desktop/Participant/JoinInfoStep/RadioButtonGroupContainer/RadioButtonGroupContainer';
import { JOIN_REGION, JOIN_SUB_REGION } from '@/app/join/JoinPage.constants';
import { MatchType } from '@/app/join/JoinPage.types';
import AddressSelect from '@/components/AddressSelect/AddressSelect';
import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import Icon from '@/components/Icon';
import { useToast } from '@/hooks/useToast';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';
import { colors } from '@/styles/colors';

// TODO: useFormParticipantUserInfo로 묶어서 내보내는 게 아니라
// 각 컴포넌트에서 필요한 데이터만 FormContext에서 가져오는 방식으로 개선
const ParticipantUserInfo = ({ userInfo }: { userInfo: ParticipantResponse }) => {
  const { form, region, additionalRegion, handleSubmit, isLoading } = useFormParticipantUserInfo({
    userInfo,
  });
  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control: form.control });
  const contactEmail = useWatch({ name: 'contactEmail', control: form.control });

  const toast = useToast();

  const isVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;
  const isValidUpdate = isVerified;

  const onSubmit = handleSubmit(
    () => toast.open({ message: '저장되었어요' }),
    () => toast.error({ message: '저장에 실패했어요. 잠시 후에 다시 시도해 주세요.' }),
  );

  return (
    <FormProvider {...form}>
      <div className={updateInfoFormContainer}>
        <section className={updateInfoForm}>
          {/* 연락 받을 이메일 */}
          <ContactEmailInput<ParticipantUpdateSchemaType>
            title="연락 받을 이메일"
            required
            contactEmailField="contactEmail"
            verifiedEmailField="verifiedContactEmail"
            helperText="주요 안내 사항을 전달받을 이메일을 입력해 주세요. 이메일 ID와 달라도 괜찮아요"
            joinedUser
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
          <AddressSelect<ParticipantUpdateSchemaType>
            title="거주 지역"
            control={form.control}
            region="basicAddressInfo.region"
            area="basicAddressInfo.area"
            regionOptions={JOIN_REGION}
            areaOptions={JOIN_SUB_REGION[region || ''] || []}
            onChangeRegion={(value: string) => {
              form.setValue('basicAddressInfo.region', value);
              form.setValue('basicAddressInfo.area', '');
            }}
            onChangeArea={(value: string) => {
              form.setValue('basicAddressInfo.area', value);
            }}
            isRequired
          />

          {/* 추가 활동 지역 */}
          <AddressSelect<ParticipantUpdateSchemaType>
            title="추가 활동 지역"
            control={form.control}
            region="additionalAddressInfo.region"
            area="additionalAddressInfo.area"
            regionOptions={JOIN_REGION}
            areaOptions={JOIN_SUB_REGION[additionalRegion || ''] || []}
            onChangeRegion={(value: string) => {
              form.setValue('additionalAddressInfo.region', value);
              form.setValue('additionalAddressInfo.area', '');
            }}
            onChangeArea={(value: string) => {
              form.setValue('additionalAddressInfo.area', value);
            }}
            tooltip={<AreaTooltip />}
          />

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
            {/* 광고성 정보 이메일/SMS 수신 동의 */}
            <Controller
              name="adConsent"
              control={form.control}
              render={({ field }) => {
                return (
                  <div className={termContainer}>
                    <JoinCheckbox
                      label="[선택] 광고성 정보 이메일/SMS 수신 동의"
                      isChecked={field.value}
                      onChange={() => form.setValue('adConsent', !field.value)}
                      emptyCheckIcon={
                        <Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />
                      }
                    />
                  </div>
                );
              }}
            />

            {/* 광고성 정보 이메일/SMS 수신 동의 */}
            <Controller
              name="matchConsent"
              control={form.control}
              render={({ field }) => {
                return (
                  <div className={termContainer}>
                    <JoinCheckbox
                      label="[선택] 개인정보 수집 및 이용 동의-실험 추천·혜택"
                      isChecked={field.value}
                      onChange={() => form.setValue('matchConsent', !field.value)}
                      emptyCheckIcon={
                        <Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />
                      }
                    />
                  </div>
                );
              }}
            />
          </div>
        </section>
        <Link href="/user/leave" className={leaveButton}>
          <span>회원탈퇴</span>
          <Icon icon="Chevron" rotate={-90} />
        </Link>
      </div>

      <button className={updateButton} onClick={onSubmit} disabled={isLoading || !isValidUpdate}>
        {isLoading ? '저장중...' : '저장하기'}
      </button>
    </FormProvider>
  );
};

export default ParticipantUserInfo;
