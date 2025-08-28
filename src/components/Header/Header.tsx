'use client';

import Logo from '../Logo/Logo';
import { headerLayout, image } from './Header.css';
import RightHeader from './RightHeader/RightHeader';

const Header = () => {
  return (
    <nav className={headerLayout}>
      <Logo className={image} width={100} height={30} />
      <RightHeader />
    </nav>
  );
};

export default Header;
