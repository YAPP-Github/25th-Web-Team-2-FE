import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  backdrop,
  contentContainer,
  delayVar,
  dragHandle,
  headerContainer,
  sheet,
  sheetContainer,
} from './BottomSheet.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

const CLOSE_THRESHOLD = 30;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  onConfirm?: () => void;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  delay?: number;
  subTitle?: string;
  onAnimationEnd?: () => void;
}

const BottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
  content,
  title,
  cancelText,
  confirmText,
  confirmDisabled,
  delay = 200,
  subTitle,
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
            <header className={headerContainer}>
              <div className={dragHandle} />
            </header>
            <div className={contentContainer}>{content}</div>
            {/* {(cancelText || confirmText) && (
              <S.Footer>
                {cancelText && <S.CancelButton onClick={onClose}>{cancelText}</S.CancelButton>}
                {confirmText && (
                  <S.ConfirmButton onClick={onConfirm} disabled={confirmDisabled}>
                    {confirmText}
                  </S.ConfirmButton>
                )}
              </S.Footer>
            )} */}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default BottomSheet;
