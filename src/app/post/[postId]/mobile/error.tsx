'use client';

import { useRouter } from 'next/navigation';

import { experimentPostMobileHeaderLayout } from './components/ExperimentPostMobileHeader/ExperimentPostMobileHeader.css';

import { commonStatusLayout, commonStatusText } from '@/app/common-status.css';
import RightHeader from '@/components/Header/RightHeader/RightHeader';
import Icon from '@/components/Icon';
import MobilePostDetailLayout from '@/components/layout/MobilePostDetailLayout/MobilePostDetailLayout';
import { colors } from '@/styles/colors';

export default function MobilePostDetailError() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };
  return (
    <MobilePostDetailLayout>
      <div className={experimentPostMobileHeaderLayout}>
        <button onClick={handleGoBack} aria-label="뒤로가기">
          <Icon icon="Arrow" width={24} height={24} color={colors.text06} />
        </button>
        <RightHeader />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className={commonStatusLayout}>
          <p className={commonStatusText}>
            공고 정보를 불러오지 못했습니다. <br /> 잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    </MobilePostDetailLayout>
  );
}
