const formatBirthdate = (date: string) => {
  if (date.length <= 4) return date;
  if (date.length <= 6) return `${date.slice(0, 4)}.${date.slice(4)}`;
  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;
};

/**
 *  @description 온점 뒤에서 백스페이스 입력 시 처리 함수
 */
export const getBackspaceAfterDotResult = (
  previousValue: string,
  currentValue: string,
  previousCursor: number | null,
) => {
  if (!previousValue || currentValue.length >= previousValue.length) {
    return null;
  }

  // 온점 뒤에서 발생한 백스페이스 입력한 경우
  if (previousCursor && previousValue[previousCursor - 1] === '.') {
    const numbers = previousValue.replace(/\D/g, '');
    const digitsBeforeDot = previousValue.slice(0, previousCursor - 1).replace(/\D/g, '').length;

    if (digitsBeforeDot > 0) {
      // 온점 바로 앞 숫자 제거
      const newNumbers = numbers.slice(0, digitsBeforeDot - 1) + numbers.slice(digitsBeforeDot);

      const formattedValue = formatBirthdate(newNumbers);
      const cursorPosition = formatBirthdate(newNumbers.slice(0, digitsBeforeDot - 1)).length;

      return { newValue: formattedValue, newCursor: cursorPosition };
    }
  }

  return null;
};

/**
 *  @description 생년월일 포맷팅 및 커서 위치 반환 함수
 */
export const formatDateInput = (
  inputType: 'text' | 'date',
  value: string,
  cursorPos: number | null = null,
) => {
  if (inputType !== 'date') {
    return { formattedValue: value, cursorPosition: cursorPos ?? value.length };
  }

  const BIRTHDATE_MAX_LENGTH = 8;
  const numbers = value.replace(/\D/g, '').slice(0, BIRTHDATE_MAX_LENGTH);

  // YYYY.MM.DD
  const formattedValue = formatBirthdate(numbers);

  // 커서 위치 계산
  const cursorPosition =
    cursorPos !== null
      ? formatBirthdate(value.slice(0, cursorPos).replace(/\D/g, '')).length
      : formattedValue.length;

  return { formattedValue, cursorPosition };
};
