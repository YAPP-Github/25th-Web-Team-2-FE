import { css, Theme } from '@emotion/react';

export const descriptionFormLayout = css`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 1.2rem;
`;

export const fullInput = css`
  max-width: 93.6rem;
`;

export const descriptionContentContainer = (theme: Theme, isError: boolean) => css`
  width: 93.6rem;
  border: 0.1rem solid ${isError ? theme.colors.textAlert : theme.colors.line01};
  border-radius: 1.2rem;

  :focus-within {
    border: 0.1rem solid ${isError ? theme.colors.textAlert : theme.colors.lineTinted};
  }
`;

export const descriptionTextarea = (photoGridHeight: number) => (theme: Theme) =>
  css`
    ${theme.fonts.label.large.R14};

    border: none;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;

    width: 100%;
    height: calc(22rem - ${photoGridHeight}rem);

    outline: none;

    padding: 1.4rem 1.6rem;

    resize: none;

    &::placeholder {
      color: ${theme.colors.text02};
    }
  `;

export const uploadImagesContainer = (theme: Theme) => css`
  height: 5.6rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1.2rem;

  padding: 1.2rem 1.6rem;

  border-top: 0.1rem solid ${theme.colors.line01};

  p {
    ${theme.fonts.label.large.R14};
    color: ${theme.colors.text02};
  }
`;

export const addImageContainer = (theme: Theme) => css`
  ${theme.fonts.label.medium.M13};
  color: ${theme.colors.text04};

  background-color: ${theme.colors.field04};

  height: 3.2rem;

  display: flex;
  flex-flow: row nowrap;
  gap: 0.6rem;
  align-items: center;

  padding: 0.8rem 1.2rem;

  border-radius: 0.8rem;
  cursor: pointer;

  p {
    ${theme.colors.text04}
  }
`;

export const photoGrid = css`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 0 1.6rem;
  height: 8rem;

  margin-top: 1rem;
  margin-bottom: 1.4rem;
`;

export const photoLayout = css`
  width: 8rem;
  height: 8rem;

  border-radius: 4px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const photoContainer = css`
  position: relative;
  width: 8rem;
  height: 8rem;
`;

export const deleteButton = css`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  border: none;
  border-radius: 50%;
`;

export const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
  padding: 0.8rem 1.6rem;
`;
