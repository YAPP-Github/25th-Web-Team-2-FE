import JoinCheckbox from './JoinCheckbox/JoinCheckbox';
import { termContainer } from './JoinCheckboxContainer.styles';
import { ServiceAgreeCheck } from '../../../JoinPage.types';

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
  const { isTermOfService, isPrivacy, isAdvertise, isRecommend } = serviceAgreeCheck;

  const isAllCheck = isTermOfService && isPrivacy && isAdvertise && (isRecommend ?? true);

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
        label="[선택] 광고성 정보 이메일/SMS 수신 동의"
        isChecked={isAdvertise}
        onChange={(e) => handleChange(e, 'isAdvertise')}
      />
      {isRecommend !== undefined && (
        <JoinCheckbox
          label="[선택] 개인정보 수집 및 이용 동의-실험 추천•혜택"
          isChecked={isRecommend}
          onChange={(e) => handleChange(e, 'isRecommend')}
          isAlert={true}
        />
      )}
    </div>
  );
};

export default JoinCheckboxContainer;
