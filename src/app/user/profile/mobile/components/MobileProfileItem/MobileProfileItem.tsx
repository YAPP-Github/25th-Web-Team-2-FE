'use client';

import Link from 'next/link';

import {
  profileItem,
  profileItemContent,
  profileItemLabel,
  profileItemValue,
  profileItemArrow,
} from './MobileProfileItem.css';

interface MobileProfileItemProps {
  label: string;
  value: string;
  required?: boolean;
  hasInfo?: boolean;
  href?: string;
  onClick?: () => void;
}

const MobileProfileItem = ({
  label,
  value,
  required = false,
  hasInfo = false,
  href,
  onClick,
}: MobileProfileItemProps) => {
  const content = (
    <div className={profileItemContent}>
      <div className={profileItemLabel}>
        {label}
        {required && <span style={{ color: '#FF6B6B' }}> *</span>}
        {hasInfo && <span style={{ marginLeft: '0.4rem', fontSize: '1.4rem' }}>ℹ️</span>}
      </div>
      <div className={profileItemValue}>
        <span>{value}</span>
        <span className={profileItemArrow}>→</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={profileItem}>
        {content}
      </Link>
    );
  }

  return (
    <div className={profileItem} onClick={onClick}>
      {content}
    </div>
  );
};

export default MobileProfileItem;
