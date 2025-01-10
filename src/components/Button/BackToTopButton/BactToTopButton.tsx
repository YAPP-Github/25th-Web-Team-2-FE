import { useEffect, useState } from 'react';

import { backToTopButton } from './BackToTopButton.styles';
import Icon from '../../Icon';

/**
 * 페이지 최상단 이동 버튼
 */
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 100); // 스크롤 위치가 100px 이상일 때 버튼 표시
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button css={backToTopButton} onClick={handleScrollToTop} aria-label="페이지 상단 이동 버튼">
      <Icon icon="BackToTopGroup" />
    </button>
  );
}

export default BackToTopButton;
