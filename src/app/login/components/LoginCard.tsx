import Naver from '@/assets/images/naver.svg';
import Google from '@/assets/images/google.svg';
import theme from '@/styles/theme';
import {
  badge,
  buttonContainer,
  cardTitleContainer,
  loginButton,
  loginCardLayout,
} from './LoginCard.styles';
import { descriptionWrapper } from '../LoginPage.styles';
import Image from 'next/image';

type Role = '연구자' | '참여자';

interface LoginCardProps {
  role: Role;
  description: string[];
}

const LoginCard = ({ role, description }: LoginCardProps) => {
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
        <button css={loginButton}>
          <Image src={Google} alt="구글" width={24} height={24} />
          <span>구글 계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
