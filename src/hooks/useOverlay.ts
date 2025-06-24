import { useContext } from 'react';

import { OverlayContext } from '@/providers/OverlayProvider';

const useOverlay = () => {
  const dispatch = useContext(OverlayContext);

  if (!dispatch) {
    throw new Error('OverlayContext가 존재하지 않습니다.');
  }

  return dispatch;
};

export default useOverlay;
