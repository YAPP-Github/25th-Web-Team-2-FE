/**
 * 문자열에서 '\\n'을 줄바꿈 문자('\n')로 변환
 *
 * @param {string} text - 변환할 문자열
 * @returns {string} 변환된 문자열
 */
const formattedContentText = (text: string) => {
  return text.replace(/\\n/g, '\n');
};

export default formattedContentText;
