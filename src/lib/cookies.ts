// 모바일 화면 준비중 모달에서 '하루동안 안보기'를 선택했을 경우
export const setHideModalCookie = (key: string) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간
  document.cookie = `${encodeURIComponent(
    key,
  )}=true; path=/; expires=${expires.toUTCString()}; SameSite=Lax; Secure`;
};

export const getHideModalCookie = (key: string): boolean => {
  return document.cookie.split('; ').some((c) => c.trim() === `${key}=true`);
};
