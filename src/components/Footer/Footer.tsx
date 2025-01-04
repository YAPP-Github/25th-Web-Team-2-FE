'use client';

import React from 'react';
import { buttonContainer, footerLayout, textContainer, verticalLine } from './Footer.styles';

const Footer = () => {
  return (
    <div css={footerLayout}>
      <div css={buttonContainer}>
        <button>공지사항</button>
        <span css={verticalLine} />
        <button>이용약관</button>
        <span css={verticalLine} />
        <button>문의하기</button>
      </div>
      <div css={textContainer}>
        <span>작은 연결로 시작되는 큰 발견, 그라밋이 돕겠습니다!</span>
        <br />
        <span>도비의 양말팀 team.gradmeet@gmail.com</span>
      </div>
    </div>
  );
};

export default Footer;
