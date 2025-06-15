import { FormProvider, useFormContext } from 'react-hook-form';

import NextButton from './NextButton';
import ServiceAgreeBottomSheet from '../../components/ServiceAgreeBottomSheet/ServiceAgreeBottomSheet';
import TitleSection from '../../components/TitleSection/TitleSection';
import { mainContentLayout } from '../../page.css';
import UnivEmailInputContainer from '../UnivEmailInputContainer/UnivEmailInputContainer';

import useOverlay from '@/hooks/useOverlay';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface UnivEmailStepProps {
  onNext: () => void;
}

const UnivEmailStep = ({ onNext }: UnivEmailStepProps) => {
  const { open, close } = useOverlay();
  const form = useFormContext<ResearcherJoinSchemaType>();

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

      {/* 다음 버튼 */}
      <NextButton onNext={onNext} openServiceAgreeBottomSheet={openServiceAgreeBottomSheet} />
    </main>
  );
};

export default UnivEmailStep;
