import { Suspense } from 'react';

import { headerLayout, image } from './Header.css';
import Logo from '../Logo/Logo';
import RightHeader from './RightHeader/RightHeader';

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
