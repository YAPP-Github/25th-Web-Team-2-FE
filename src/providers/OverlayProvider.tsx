import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

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
  isOpen: boolean;
}

export const OverlayContext = createContext<OverlayContextProps | null>(null);

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlay, setOverlay] = useState<Overlay>({
    Component: null,
    isOpen: false,
  });

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

  const dispatch = useMemo(
    () => ({ open, close, isOpen: overlay.isOpen }),
    [open, close, overlay.isOpen],
  );

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
