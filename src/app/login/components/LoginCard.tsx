import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  badge,
  buttonContainer,
  cardTitleContainer,
  loginButton,
  loginCardLayout,
} from './LoginCard.styles';
import { descriptionWrapper } from '../LoginPage.styles';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import theme from '@/styles/theme';

const roleMapper = {
  연구자: 'RESEARCHER',
  참여자: 'PARTICIPANT',
};

type Role = '연구자' | '참여자';

interface LoginCardProps {
  role: Role;
  description: string[];
}

const LoginCard = ({ role, description }: LoginCardProps) => {
  const router = useRouter();

  const goToLoginGoogle = () => {
    const OAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${roleMapper[role]}`;
    router.push(OAuthURL);
  };

  return (
    <div css={loginCardLayout}>
      <div css={cardTitleContainer}>
        <div
          css={badge}
          style={{
            color: role === '연구자' ? theme.colors.secondaryPink : theme.colors.primaryMint,
            backgroundColor:
              role === '연구자' ? theme.colors.secondaryTinted : theme.colors.primaryTinted,
          }}
        >
          {role}
        </div>
        <div css={descriptionWrapper}>
          {description.map((text, idx) => (
            <span key={idx}>
              {text}
              <br />
            </span>
          ))}
        </div>
      </div>
      <div css={buttonContainer}>
        <button css={loginButton}>
          <Image src={Naver} alt="네이버" width={24} height={24} />
          <span>네이버 계정으로 로그인</span>
        </button>
        <button css={loginButton} onClick={goToLoginGoogle}>
          <Image src={Google} alt="구글" width={24} height={24} />
          <span>구글 계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
