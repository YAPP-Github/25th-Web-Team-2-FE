import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { ServiceAgreeCheck } from '../../JoinPage.types';
import JoinCheckbox from './JoinCheckbox/JoinCheckbox';
import { termContainer } from './JoinCheckboxContainer.css';

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

  const { isTermOfService, isPrivacy, isRecommend } = serviceAgreeCheck;

  const isAllCheck = isTermOfService && isPrivacy && adConsent && (isRecommend ?? true);

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
      <JoinCheckbox
        label="서비스 이용약관 동의"
        isChecked={isTermOfService}
        onChange={(e) => handleChange(e, 'isTermOfService')}
        isRequired
      />

      {/* 개인정보 수집 및 이용 동의 */}
      <JoinCheckbox
        label="개인정보 수집 및 이용 동의"
        isChecked={isPrivacy}
        onChange={(e) => handleChange(e, 'isPrivacy')}
        isRequired
      />

      {/* 이메일/SMS 수신 동의 */}
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

      {/* 실험 추천 이메일 수신 동의 */}
      {isRecommend !== undefined && (
        <JoinCheckbox
          label="[선택] 개인정보 수집 및 이용 동의-실험 추천·혜택"
          isChecked={isRecommend}
          onChange={(e) => handleChange(e, 'isRecommend')}
          isAlert={true}
        />
      )}
    </div>
  );
};

export default JoinCheckboxContainer;
