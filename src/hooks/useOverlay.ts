import { OverlayContext } from '@/providers/OverlayProvider';
import { useContext } from 'react';

const useOverlay = () => {
  const dispatch = useContext(OverlayContext);

  if (!dispatch) {
    throw new Error('OverlayContext가 존재하지 않습니다.');
  }

  return dispatch;
};

export default useOverlay;
