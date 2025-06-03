'use client';

import Image from 'next/image';
import Link from 'next/link';

import { headerLayout, image } from './Header.css';
import RightHeader from './RightHeader/RightHeader';
import Logo from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <nav className={headerLayout}>
      <Link href="/">
        <Image src={Logo} alt="로고" className={image} width={100} height={30} priority />
      </Link>
      <RightHeader />
    </nav>
  );
};

export default Header;
