import { Suspense } from 'react';

import Logo from '@common/Logo';

import { headerLayout, image } from './Header.css';
import RightHeader from './RightHeader';


const Header = () => {
  return (
    <nav className={headerLayout}>
      <Logo className={image} width={100} height={30} />
      <Suspense>
        <RightHeader />
      </Suspense>
    </nav>
  );
};

export default Header;
