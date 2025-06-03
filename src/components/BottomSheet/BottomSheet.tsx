import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  backdrop,
  contentContainer,
  delayVar,
  dragHandle,
  headerContainer,
  headerContent,
  headerTitle,
  sheet,
  sheetContainer,
} from './BottomSheet.css';
import Icon from '../Icon';

import { colors } from '@/styles/colors';

const CLOSE_THRESHOLD = 30;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  title?: string;
  isDraggable?: boolean;
  delay?: number;
  onAnimationEnd?: () => void;
}

const BottomSheet = ({
  isOpen,
  onClose,
  content,
  title,
  isDraggable = true,
  delay = 200,
  onAnimationEnd,
}: BottomSheetProps) => {
  const [isAnimating, setIsAnimating] = useState(isOpen);

  const [translateY, setTranslateY] = useState(0);
  const startYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startYRef.current === null) return;

    const deltaY = e.touches[0].clientY - startYRef.current;

    setTranslateY(deltaY);
  };

  const handleTouchEnd = () => {
    if (translateY > CLOSE_THRESHOLD) {
      onClose();
    }

    startYRef.current = null;
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
      document.body.style.setProperty('overflow', '');
      if (onAnimationEnd) onAnimationEnd();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      setTranslateY(0);
    }
  }, [isOpen]);

  if (!isAnimating) return null;

  return (
    <>
      {createPortal(
        <div className={sheetContainer}>
          <div onClick={onClose} className={backdrop({ isOpen })} />
          <div
            className={sheet({ isOpen })}
            style={{
              ...assignInlineVars({ [delayVar]: `${delay / 1000}s` }),
              transform: translateY > 0 ? `translateY(${translateY}px)` : undefined,
            }}
            onAnimationEnd={handleAnimationEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <header className={headerContainer({ isDraggable })}>
              {isDraggable ? (
                <div className={dragHandle} />
              ) : (
                <div className={headerContent}>
                  <span className={headerTitle}>{title}</span>
                  <Icon
                    icon="CloseRound"
                    width={28}
                    height={28}
                    cursor="pointer"
                    color={colors.field04}
                    subcolor={colors.text06}
                    onClick={onClose}
                  />
                </div>
              )}
            </header>
            <div className={contentContainer}>{content}</div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default BottomSheet;
