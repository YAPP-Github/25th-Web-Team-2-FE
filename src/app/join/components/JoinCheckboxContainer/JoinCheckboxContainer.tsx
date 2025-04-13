import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { ServiceAgreeCheck } from '../../JoinPage.types';
import AgreeAccordion from './AgreeAccordion/AgreeAccordion';
import JoinCheckbox from './JoinCheckbox/JoinCheckbox';
import { termContainer } from './JoinCheckboxContainer.css';
import Policy from './Policy';
import {
  ADVERTISE_TEXT,
  PRIVACY_TEXT,
  RECOMMEND_ALERT_TEXT,
  SERVICE_TERM_TEXT,
} from '../../JoinPage.constants';

interface JoinCheckboxContainerProps {
  serviceAgreeCheck: ServiceAgreeCheck;
  handleAllCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

const JoinCheckboxContainer = ({
  serviceAgreeCheck,
  handleAllCheck,
  handleChange,
}: JoinCheckboxContainerProps) => {
  const { control, setValue } = useFormContext();
  const adConsent = useWatch({ name: 'adConsent', control });
  const matchConsent = useWatch({ name: 'matchConsent', control });

  const { isTermOfService, isPrivacy } = serviceAgreeCheck;

  const isAllCheck = isTermOfService && isPrivacy && adConsent && (matchConsent ?? true);

  return (
    <div className={termContainer}>
      {/* 모두 동의 */}
      <JoinCheckbox
        label="이용약관에 모두 동의합니다"
        isChecked={isAllCheck}
        onChange={handleAllCheck}
        isAllCheck={true}
        isArrow={false}
      />

      {/* 서비스 이용약관 동의 */}
      <AgreeAccordion
        trigger={
          <JoinCheckbox
            label="서비스 이용약관 동의"
            isChecked={isTermOfService}
            onChange={(e) => handleChange(e, 'isTermOfService')}
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
            isChecked={isPrivacy}
            onChange={(e) => handleChange(e, 'isPrivacy')}
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
  );
};

export default JoinCheckboxContainer;
