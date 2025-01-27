'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  buttonContainer,
  buttonWrapper,
  contactButton,
  headerLayout,
  image,
  loginButton,
} from './Header.css';
import Logo from '../../assets/images/logo.svg';
import Icon from '../Icon';

import { useUserInfoQuery } from '@/app/home/hooks/useUserInfoQuery';

const Header = () => {
  const role = sessionStorage.getItem('role') || '';
  const { data: myData } = useUserInfoQuery(role);

  return (
    <div className={headerLayout}>
      <Link href="/">
        <Image src={Logo} alt="로고" className={image} />
      </Link>
      <div className={buttonContainer}>
        <Link href="/upload">
          <button className={contactButton}>실험 공고 등록</button>
        </Link>

        {myData ? (
          <div className={buttonWrapper}>
            <button>{myData.memberInfo.name}</button>
            <Icon icon="TriangleArrow" width={20} height={20} rotate={180} />
          </div>
        ) : (
          <Link href="/login" className={loginButton}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
