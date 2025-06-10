import { PropsWithChildren } from 'react';
import { defaultLayout, defaultLayoutContainer } from '../DefaultLayout/DefaultLayout.css';

const MobilePostDetailLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={defaultLayoutContainer}>
      <div className={defaultLayout}>{children}</div>
    </div>
  );
};

export default MobilePostDetailLayout;
