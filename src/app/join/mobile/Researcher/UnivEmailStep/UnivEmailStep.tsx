import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import ServiceAgreeBottomSheet from '../../components/ServiceAgreeBottomSheet/ServiceAgreeBottomSheet';
import TitleSection from '../../components/TitleSection/TitleSection';
import { bottomButtonLayout, mainContentLayout } from '../../page.css';
import UnivEmailInputContainer from '../UnivEmailInputContainer/UnivEmailInputContainer';

import Button from '@/components/Button/Button';
import useOverlay from '@/hooks/useOverlay';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface UnivEmailStepProps {
  onNext: () => void;
}

const UnivEmailStep = ({ onNext }: UnivEmailStepProps) => {
  const form = useFormContext<ResearcherJoinSchemaType>();
  const { control } = form;

  const { open, close } = useOverlay();

  // 버튼 활성화 조건
  const isEmailVerified = useWatch({ name: 'isEmailVerified', control });
  const isTermOfService = useWatch({ name: 'isTermOfService', control });
  const isPrivacy = useWatch({ name: 'isPrivacy', control });

  const isValidCheck = isTermOfService && isPrivacy;
  const canNext = isEmailVerified && isValidCheck;

  const openServiceAgreeBottomSheet = () => {
    open(() => (
      <FormProvider {...form}>
        <ServiceAgreeBottomSheet
          onConfirm={() => {
            onNext();
            close();
          }}
        />
      </FormProvider>
    ));
  };

  return (
    <main className={mainContentLayout}>
      <TitleSection
        title="학교 메일을 입력해 주세요"
        description={`대학원생임을 인증하기 위해 필요해요\n추후 수정할 수 없으니 신중히 입력해 주세요`}
      />

      {/* 학교 메일 인증 */}
      <UnivEmailInputContainer openServiceAgreeBottomSheet={openServiceAgreeBottomSheet} />

      {isEmailVerified && (
        <div className={bottomButtonLayout}>
          <Button
            variant="primary"
            size="small"
            height="56px"
            onClick={canNext ? onNext : openServiceAgreeBottomSheet}
          >
            다음
          </Button>
        </div>
      )}
    </main>
  );
};

export default UnivEmailStep;
