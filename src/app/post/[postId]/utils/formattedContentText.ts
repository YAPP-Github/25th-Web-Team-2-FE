/**
 * 문자열에서 '\\n'을 줄바꿈 문자('\n')로 변환
 */
export const formattedContentText = (text: string) => {
  return text.replace(/\\n/g, '\n');
};
