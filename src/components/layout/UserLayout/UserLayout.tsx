import { PropsWithChildren } from 'react';

import { userLayout, userLayoutContainer } from './UserLayout.css';

import BackToTopButton from '@/components/Button/BackToTopButton/BackToTopButton';

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
