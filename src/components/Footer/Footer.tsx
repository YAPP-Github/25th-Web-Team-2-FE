import React from 'react';

import { buttonContainer, footerLayout, textContainer, verticalLine } from './Footer.css';

import { CONTACT_URL, NOTICE_URL, TERMS_URL } from '@/constants/externalUrl';

const Footer = () => {
  return (
    <div className={footerLayout}>
      <div className={buttonContainer}>
        <a href={NOTICE_URL} target="_blank" rel="noopener noreferrer">
          공지사항
        </a>
        <span className={verticalLine} />
        <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">
          이용약관
        </a>
        <span className={verticalLine} />
        <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
          문의하기
        </a>
      </div>
      <div className={textContainer}>
        <span>작은 연결로 시작되는 큰 발견, 그라밋이 돕겠습니다!</span>
        <br />
        <span>도비의 양말팀 team.gradmeet@gmail.com</span>
      </div>
    </div>
  );
};

export default Footer;
