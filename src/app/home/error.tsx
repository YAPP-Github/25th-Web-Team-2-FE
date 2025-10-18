'use client';

import { signOut } from 'next-auth/react';

import { AuthError } from '@/apis/config/error';
import Button from '@/components/Button/Button';
import Footer from '@/components/Footer/Footer';
import Icon from '@/components/Icon';
import {
  defaultLayout,
  defaultLayoutContainer,
} from '@/components/layout/DefaultLayout/DefaultLayout.css';
import { fonts } from '@/styles/fonts.css';

export default function HomeError(error: Error) {
  if (error instanceof AuthError) {
    signOut({ callbackUrl: '/' });
  }

  return (
    <div className={defaultLayoutContainer}>
      <div className={defaultLayout}>
        <div
          style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          <Icon icon="Alert" width={80} height={80} />
          <h2 style={{ ...fonts.title.large.SB24 }}>홈 페이지 로드 중 문제가 발생했어요.</h2>
          <Button
            variant="primary"
            size="medium"
            width="20rem"
            onClick={() => window.location.reload()}
          >
            다시 시도해주세요.
          </Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
