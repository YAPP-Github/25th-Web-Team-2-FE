'use client';

import Link from 'next/link';

import { desktopRightHeader, uploadButton } from './DesktopLoginHeader.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { PATH } from '@/constants/path';
import { startRecording, trackEvent } from '@/lib/mixpanelClient';
import { isResearcherInfo } from '@/utils/typeGuard';

interface DesktopLoginHeaderProps {
  userInfo: ParticipantResponse | ResearcherResponse;
}

const DesktopLoginHeader = ({ userInfo }: DesktopLoginHeaderProps) => {
  const goToUpload = () => {
    trackEvent('Post Upload', {
      action: 'Navigation Click',
      path: PATH.upload,
    });
    startRecording();
  };

  return (
    <div className={desktopRightHeader}>
      {isResearcherInfo(userInfo) && (
        <Link href="/upload" className={uploadButton} onClick={goToUpload}>
          실험 공고 등록
        </Link>
      )}
      <HeaderMenu userInfo={userInfo} />
    </div>
  );
};

export default DesktopLoginHeader;
