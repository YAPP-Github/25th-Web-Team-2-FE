export const getDeviceType = (): 'mobile' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';

  const userAgent = window.navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  return isMobile ? 'mobile' : 'desktop';
};

export const isDesktop = () => getDeviceType() === 'desktop';
export const isMobile = () => getDeviceType() === 'mobile';
