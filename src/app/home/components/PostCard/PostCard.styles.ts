import { css, Theme } from '@emotion/react';

export const postCardLayout = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border: 1px solid black;
  padding: 1.6rem 2rem;

  border: none;
  border-radius: 1.2rem;
  justify-content: space-between;
  height: 20rem;

  &:hover {
    box-shadow: 0px 4px 16px 0px rgba(53, 59, 61, 0.08);
  }
`;

export const postHeader = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const postCardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
`;

export const postLocation = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text03};
`;

export const postCardRightHeader = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const postViews = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text03};
`;

export const postTitle = (theme: Theme) => css`
  ${theme.fonts.title.small.SB18};
  color: ${theme.colors.text06};
`;

export const postRewardContainer = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const announceText = (theme: Theme) => css`
  ${theme.fonts.label.medium.M14};
  color: ${theme.colors.text03};
`;

export const postReward = (theme: Theme) => css`
  ${theme.fonts.label.medium.SB14};
  color: ${theme.colors.primaryMint};
`;

export const postDate = (theme: Theme) => css`
  ${theme.fonts.label.medium.M14};
  color: ${theme.colors.text04};
`;
