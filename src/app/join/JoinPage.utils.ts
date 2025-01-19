export const formatAuthTimer = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getProvider = (email: string): 'GOOGLE' | 'NAVER' => {
  const domain = email.split('@')[1].toLowerCase();

  if (domain.includes('gmail.com')) {
    return 'GOOGLE';
  }
  return 'NAVER';
};
