import Link from 'next/link';

import { mobileRightHeader } from './MobileLoginHeader.css';

import Icon from '@/components/Icon';

const MobileLoginHeader = () => {
  return (
    <>
      <div className={mobileRightHeader}>
        <Link href="/upload">
          <Icon icon="Pen" width={24} height={24} cursor="pointer" />
        </Link>
        <Link href="/user/profile">
          <Icon icon="Profile" width={24} height={24} cursor="pointer" />
        </Link>
      </div>
    </>
  );
};

export default MobileLoginHeader;
