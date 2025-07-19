'use client';

import { colors } from '@/styles/colors';
import { backHeaderWrapper } from './BackHeader.css';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';

const BackHeader = () => {
  const router = useRouter();

  return (
    <header className={backHeaderWrapper}>
      <button onClick={() => router.back()}>
        <Icon icon="Arrow" color={colors.text06} />
      </button>
    </header>
  );
};

export default BackHeader;
