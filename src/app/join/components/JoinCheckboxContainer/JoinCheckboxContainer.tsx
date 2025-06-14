import { useFormContext, useWatch } from 'react-hook-form';

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

const JoinCheckboxContainer = () => {
  const { control, setValue } = useFormContext();

  const adConsent = useWatch({ name: 'adConsent', control });
  const matchConsent = useWatch({ name: 'matchConsent', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const isAllCheck = isTermOfService && isPrivacy && adConsent && (matchConsent ?? true);

  const existMatchConsent = matchConsent !== undefined;

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (existMatchConsent) {
      setValue('matchConsent', e.target.checked);
    }

    setValue('isTermOfService', e.target.checked);
    setValue('isPrivacy', e.target.checked);
    setValue('adConsent', e.target.checked);
  };

  return (
    <div className={termContainer}>
      {/* 모두 동의 */}
      <JoinCheckbox
        label="이용약관에 모두 동의합니다"
        isChecked={isAllCheck}
        onChange={handleAllCheck}
        isAllCheck={true}
      />

      {/* 서비스 이용약관 동의 */}
      <AgreeAccordion
        trigger={
          <JoinCheckbox
            label="서비스 이용약관 동의"
            isChecked={isTermOfService}
            onChange={(e) => setValue('isTermOfService', e.target.checked)}
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
            onChange={(e) => setValue('isPrivacy', e.target.checked)}
            isRequired
          />
        }
        content={<Policy content={PRIVACY_TEXT} />}
      />

      {/* 이메일/SMS 수신 동의 */}
      <AgreeAccordion
        trigger={
          <JoinCheckbox
            label="[선택] 광고성 정보 이메일/SMS 수신 동의"
            isChecked={adConsent}
            onChange={(e) => setValue('adConsent', e.target.checked)}
          />
        }
        content={<Policy content={ADVERTISE_TEXT} />}
      />

      {/* 실험 추천 이메일 수신 동의 */}
      {existMatchConsent && (
        <AgreeAccordion
          trigger={
            <JoinCheckbox
              label="[선택] 개인정보 수집 및 이용 동의-실험 추천·혜택"
              isChecked={matchConsent}
              onChange={(e) => setValue('matchConsent', e.target.checked)}
            />
          }
          content={<Policy content={RECOMMEND_ALERT_TEXT} />}
        />
      )}
    </div>
  );
};

export default JoinCheckboxContainer;
