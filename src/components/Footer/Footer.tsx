import React from 'react';

import { buttonContainer, footerLayout, textContainer, verticalLine } from './Footer.css';

const Footer = () => {
  return (
    <div className={footerLayout}>
      <div className={buttonContainer}>
        <button>공지사항</button>
        <span className={verticalLine} />
        <button>이용약관</button>
        <span className={verticalLine} />
        <button>문의하기</button>
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
