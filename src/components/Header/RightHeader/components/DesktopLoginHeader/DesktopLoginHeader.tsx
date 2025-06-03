import Link from 'next/link';

import { desktopRightHeader, uploadButton } from './DesktopLoginHeader.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

interface DesktopLoginHeaderProps {
  isResearcher: boolean;
  userInfo: ParticipantResponse | ResearcherResponse;
}

const DesktopLoginHeader = ({ isResearcher, userInfo }: DesktopLoginHeaderProps) => {
  return (
    <div className={desktopRightHeader}>
      {isResearcher && (
        <Link href="/upload" className={uploadButton}>
          실험 공고 등록
        </Link>
      )}
      <HeaderMenu userInfo={userInfo} />
    </div>
  );
};

export default DesktopLoginHeader;
