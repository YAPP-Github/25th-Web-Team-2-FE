import Link from 'next/link';

import { mobileRightHeader } from './MobileLoginHeader.css';

import Icon from '@/components/Icon';

interface MobileLoginHeaderProps {
  isResearcher: boolean;
}

const MobileLoginHeader = ({ isResearcher }: MobileLoginHeaderProps) => {
  return (
    <>
      <div className={mobileRightHeader}>
        {isResearcher && (
          <Link href="/upload">
            <Icon icon="Pen" width={24} height={24} cursor="pointer" />
          </Link>
        )}
        <Link href="/user/profile">
          <Icon icon="Profile" width={24} height={24} cursor="pointer" />
        </Link>
      </div>
    </>
  );
};

export default MobileLoginHeader;
