'use client';

import { useRouter } from 'next/navigation';

import { backHeaderWrapper } from './BackHeader.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';


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
