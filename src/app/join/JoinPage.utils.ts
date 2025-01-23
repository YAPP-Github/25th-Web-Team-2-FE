export const formatAuthTimer = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getProvider = (email: string): 'GOOGLE' | 'NAVER' => {
  const GOOGLE_DOMAINS = ['gmail.com', 'googlemail.com'];
  const NAVER_DOMAINS = ['naver.com', 'nate.com'];

  const targetDomain = email.split('@')[1].toLowerCase();

  if (GOOGLE_DOMAINS.some((domain) => targetDomain.includes(domain))) {
    return 'GOOGLE';
  } else if (NAVER_DOMAINS.some((domain) => targetDomain.includes(domain))) {
    return 'NAVER';
  }

  throw new Error('지원하지 않는 이메일입니다.');
};
