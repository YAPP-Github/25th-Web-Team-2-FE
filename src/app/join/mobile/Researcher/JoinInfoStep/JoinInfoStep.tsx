import { useFormContext } from 'react-hook-form';

import { joinContentContainer } from './JoinInfoStep.css';
import TitleSection from '../../components/TitleSection/TitleSection';
import { bottomButtonLayout, mainContentLayout } from '../../page.css';

import JoinButton from '@/app/join/components/JoinButton/JoinButton';
import JoinInput from '@/app/join/components/JoinInput/JoinInput';
import JoinTextarea from '@/app/join/components/JoinTextarea/JoinTextarea';
import { useFocusNavigation } from '@/app/join/hooks/useFocusNavigation';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const inputOrder = ['name', 'univName', 'major', 'labInfo'];

interface JoinInfoStepProps {
  onSubmit: () => void;
}

const JoinInfoStep = ({ onSubmit }: JoinInfoStepProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();
  const { handleKeyDown, setInputRef } = useFocusNavigation(inputOrder);

  return (
    <main className={mainContentLayout}>
      <TitleSection
        title="연구자 정보를 입력해주세요"
        description={`실험 공고를 등록할 때 노출될 정보예요\n구체적일수록 참여자가 신청할 확률이 높아져요`}
      />

      <div className={joinContentContainer}>
        {/* 이름 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="name"
          control={control}
          label="이름"
          required
          placeholder="이름(실명) 입력"
          inputPropRef={setInputRef('name')}
          onKeyDown={handleKeyDown('name')}
        />

        {/* 학교명 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="univName"
          control={control}
          label="학교명"
          required
          placeholder="학교명 입력"
          inputPropRef={setInputRef('univName')}
          onKeyDown={handleKeyDown('univName')}
        />

        {/* 전공명 */}
        <JoinInput<ResearcherJoinSchemaType>
          name="major"
          control={control}
          label="전공명"
          required
          placeholder="전공명 입력"
          inputPropRef={setInputRef('major')}
          onKeyDown={handleKeyDown('major')}
        />

        {/* 소속 연구실 정보 */}
        <JoinTextarea<ResearcherJoinSchemaType>
          name="labInfo"
          control={control}
          label="소속 연구실 정보"
          placeholder="연구실 정보 입력"
          maxLength={100}
          inputPropRef={setInputRef('labInfo')}
          onKeyDown={handleKeyDown('labInfo')}
        />
      </div>

      {/* 회원가입 버튼 */}
      <div className={bottomButtonLayout}>
        <JoinButton<ResearcherJoinSchemaType>
          onSubmit={onSubmit}
          validationFields={['name', 'univName', 'major']}
          height="5.6rem"
        />
      </div>
    </main>
  );
};

export default JoinInfoStep;
