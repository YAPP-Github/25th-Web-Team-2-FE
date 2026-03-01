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

  if (previousCursor && previousValue[previousCursor - 1] === '.') {
    const numbers = previousValue.replace(/\D/g, '');
    const digitsBeforeDot = previousValue.slice(0, previousCursor - 1).replace(/\D/g, '').length;

    if (digitsBeforeDot > 0) {
      const newNumbers = numbers.slice(0, digitsBeforeDot - 1) + numbers.slice(digitsBeforeDot);

      const formattedValue = formatBirthdate(newNumbers);
      const cursorPosition = formatBirthdate(newNumbers.slice(0, digitsBeforeDot - 1)).length;

      return { newValue: formattedValue, newCursor: cursorPosition };
    }
  }

  return null;
};
