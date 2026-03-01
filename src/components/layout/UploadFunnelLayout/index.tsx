import { uploadFunnelLayout } from './UploadFunnelLayout.css';

import BackToTopButton from '@/components/Button/BackToTopButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { defaultLayoutContainer } from '@/components/layout/DefaultLayout/DefaultLayout.css';

const UploadFunnelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={defaultLayoutContainer}>
      <Header />
      <div className={uploadFunnelLayout}>
        {children}
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default UploadFunnelLayout;
