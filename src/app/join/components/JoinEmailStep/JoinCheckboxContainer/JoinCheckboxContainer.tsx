import { ServiceAgreeCheck } from '../../../JoinPage.types';
import JoinCheckbox from './JoinCheckbox/JoinCheckbox';
import { termContainer } from './JoinCheckboxContainer.styles';

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
  const { isTermOfService, isPrivacy, isAdvertise } = serviceAgreeCheck;

  const isAllCheck = isTermOfService && isPrivacy && isAdvertise;

  return (
    <div css={termContainer}>
      <JoinCheckbox
        label="이용약관에 모두 동의합니다"
        isChecked={isAllCheck}
        onChange={handleAllCheck}
        isAllCheck={true}
      />
      <JoinCheckbox
        label="서비스 이용약관 동의"
        isChecked={isTermOfService}
        onChange={(e) => handleChange(e, 'isTermOfService')}
        isRequired
      />
      <JoinCheckbox
        label="개인정보 수집 및 이용 동의"
        isChecked={isPrivacy}
        onChange={(e) => handleChange(e, 'isPrivacy')}
        isRequired
      />

      <JoinCheckbox
        label="광고성 정보 이메일/SMS 수신 동의"
        isChecked={isAdvertise}
        onChange={(e) => handleChange(e, 'isAdvertise')}
      />
    </div>
  );
};

export default JoinCheckboxContainer;
