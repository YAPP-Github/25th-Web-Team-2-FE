'use client';

import Link from 'next/link';

import { desktopRightHeader, uploadButton } from './DesktopLoginHeader.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { startRecording } from '@/lib/mixpanelClient';

interface DesktopLoginHeaderProps {
  isResearcher: boolean;
  userInfo: ParticipantResponse | ResearcherResponse;
}

const DesktopLoginHeader = ({ isResearcher, userInfo }: DesktopLoginHeaderProps) => {
  const goToUpload = () => {
    startRecording();
  };

  return (
    <div className={desktopRightHeader}>
      {isResearcher && (
        <Link href="/upload" className={uploadButton} onClick={goToUpload}>
          실험 공고 등록
        </Link>
      )}
      <HeaderMenu userInfo={userInfo} />
    </div>
  );
};

export default DesktopLoginHeader;
