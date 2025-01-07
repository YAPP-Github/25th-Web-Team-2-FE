import { css, Theme } from '@emotion/react';

export const postInfoTableLayout = (theme: Theme) => css`
  width: 79.8rem;
  margin-top: 2.8rem;

  border-collapse: collapse;
  ${theme.fonts.body.normal.M16}

  th,
  td {
    padding-bottom: 1.2rem;
    text-align: left;
    vertical-align: top;
    height: 2.4rem;
  }

  th {
    color: ${theme.colors.text03};
  }

  td {
    color: ${theme.colors.text05};
  }
`;

export const warningMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.6rem;

  width: fit-content;
  margin-top: 0.8rem;
  padding: 0.4rem 1.2rem;

  background-color: ${theme.colors.fieldAlert};
  border-radius: 1.2rem;

  color: ${theme.colors.textAlert};
`;

export const targetRow = css`
  height: 8.4rem; /* 모집 대상만 큰 높이를 가지도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 텍스트와 경고 메시지 간격 유지 */
`;
