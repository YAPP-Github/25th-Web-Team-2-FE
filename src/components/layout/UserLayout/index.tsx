import { PropsWithChildren } from 'react';

import BackToTopButton from '@common/Button/BackToTopButton';

import { userLayout, userLayoutContainer } from './UserLayout.css';


const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={userLayoutContainer}>
      <div className={userLayout}>
        {children}
        <BackToTopButton />
      </div>
    </div>
  );
};

export default UserLayout;
