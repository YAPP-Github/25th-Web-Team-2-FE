/**
 * 만 나이 계산 함수
 * @param birthDate - 'YYYY-MM-DD' 형식의 생년월일 문자열
 * @returns 만 나이
 */
export const calculateAgeFromBirthDate = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);

  const yearDiff = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  const hasBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);

  return hasBirthdayPassed ? yearDiff : yearDiff - 1;
};
