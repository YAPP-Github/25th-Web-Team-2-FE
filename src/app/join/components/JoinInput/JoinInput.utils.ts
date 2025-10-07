export const formatBirthdate = (date: string) => {
  if (date.length <= 4) return date;
  if (date.length <= 6) return `${date.slice(0, 4)}.${date.slice(4)}`;
  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;
};

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
  const cursorPosition = cursorPos
    ? formatBirthdate(value.slice(0, cursorPos).replace(/\D/g, '')).length
    : formattedValue.length;

  return { formattedValue, cursorPosition };
};
