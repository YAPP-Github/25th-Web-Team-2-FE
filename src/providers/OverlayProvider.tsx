import { usePathname } from 'next/navigation';
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import BottomSheet from '@/components/BottomSheet/BottomSheet';
import { HeaderMode } from '@/types/bottomSheet';

interface OverlayProps {
  title?: string;
  headerMode?: HeaderMode;
}

interface Overlay extends OverlayProps {
  Component: React.FC<OverlayState> | null;
  isOpen: boolean;
}

interface OverlayState {
  isOpen: boolean;
}

interface OverlayContextProps {
  open: (Component: React.FC<OverlayState> | null, props?: OverlayProps) => void;
  close: () => void;
}

export const OverlayContext = createContext<OverlayContextProps | null>(null);

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlay, setOverlay] = useState<Overlay>({
    Component: null,
    isOpen: false,
  });

  const pathname = usePathname();

  const open = useCallback((Component: React.FC<OverlayState> | null, props?: OverlayProps) => {
    setOverlay({
      ...props,
      Component,
      isOpen: true,
    });
  }, []);

  const close = useCallback(() => {
    setOverlay((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const exit = useCallback(() => {
    setOverlay((prev) => ({
      ...prev,
      Component: null,
    }));
  }, []);

  // 라우터 이동 또는 브라우저 뒤로가기 발생 시 바텀시트 닫음
  useEffect(() => {
    close();
    exit();
  }, [close, exit, pathname]);

  const dispatch = useMemo(() => ({ open, close }), [open, close]);

  return (
    <OverlayContext.Provider value={dispatch}>
      {children}
      {overlay.Component && (
        <BottomSheet
          isOpen={overlay.isOpen}
          onClose={close}
          onAnimationEnd={exit}
          title={overlay.title}
          headerMode={overlay.headerMode}
          content={<overlay.Component {...overlay} />}
        />
      )}
    </OverlayContext.Provider>
  );
};
