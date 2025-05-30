import { Controller, useFormContext, useWatch } from 'react-hook-form';

import AgreeAccordion from '../../../components/JoinCheckboxContainer/AgreeAccordion/AgreeAccordion';
import JoinCheckbox from '../../../components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Policy from '../../../components/JoinCheckboxContainer/Policy';
import {
  ADVERTISE_TEXT,
  PRIVACY_TEXT,
  RECOMMEND_ALERT_TEXT,
  SERVICE_TERM_TEXT,
} from '../../../JoinPage.constants';
import {
  checkboxWrapper,
  serviceAgreeBottomSheetLayout,
  serviceAgreeContainer,
} from '../../page.css';

import Button from '@/components/Button/Button';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';

interface ServiceAgreeBottomSheetProps {
  onConfirm: () => void;
}

const ServiceAgreeBottomSheet = ({ onConfirm }: ServiceAgreeBottomSheetProps) => {
  const { control, setValue } = useFormContext<ParticipantJoinSchemaType>();

  const matchConsent = useWatch({ name: 'matchConsent', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const isValid = isTermOfService && isPrivacy;

  return (
    <section className={serviceAgreeBottomSheetLayout}>
      <div className={serviceAgreeContainer}>
        {/* 서비스 이용약관 동의 */}
        <AgreeAccordion
          trigger={
            <JoinCheckbox
              label="서비스 이용약관 동의"
              className={checkboxWrapper}
              isChecked={isTermOfService}
              onChange={() => setValue('isTermOfService', !isTermOfService)}
              isRequired
            />
          }
          content={<Policy content={SERVICE_TERM_TEXT} />}
        />

        {/* 개인정보 수집 및 이용 동의 */}
        <AgreeAccordion
          trigger={
            <JoinCheckbox
              label="개인정보 수집 및 이용 동의"
              className={checkboxWrapper}
              isChecked={isPrivacy}
              onChange={() => setValue('isPrivacy', !isPrivacy)}
              isRequired
            />
          }
          content={<Policy content={PRIVACY_TEXT} />}
        />

        {/* 이메일/SMS 수신 동의 */}
        <AgreeAccordion
          trigger={
            <Controller
              name="adConsent"
              control={control}
              render={({ field }) => {
                return (
                  <JoinCheckbox
                    label="[선택] 광고성 정보 이메일/SMS 수신 동의"
                    className={checkboxWrapper}
                    isChecked={field.value}
                    onChange={() => setValue('adConsent', !field.value)}
                  />
                );
              }}
            />
          }
          content={<Policy content={ADVERTISE_TEXT} />}
        />

        {/* 실험 추천 이메일 수신 동의 */}
        {matchConsent !== undefined && (
          <AgreeAccordion
            trigger={
              <Controller
                name="matchConsent"
                control={control}
                render={({ field }) => {
                  return (
                    <JoinCheckbox
                      label="[선택] 개인정보 수집 및 이용 동의-실험 추천·혜택"
                      subLabel="*참여할 수 있는 실험 알림을 보내드려요"
                      className={checkboxWrapper}
                      isChecked={field.value}
                      onChange={() => setValue('matchConsent', !field.value)}
                    />
                  );
                }}
              />
            }
            content={<Policy content={RECOMMEND_ALERT_TEXT} />}
          />
        )}
      </div>
      <Button variant="primary" size="small" height="56px" disabled={!isValid} onClick={onConfirm}>
        동의하기
      </Button>
    </section>
  );
};

export default ServiceAgreeBottomSheet;
