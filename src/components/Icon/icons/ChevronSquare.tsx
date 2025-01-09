import { CustomSVGProps } from '..';

import theme from '@/styles/theme';

function ChevronSquare(props: CustomSVGProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
        stroke={props.color || theme.colors.icon03}
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.53 14.22C15.72 14.22 15.91 14.15 16.06 14C16.35 13.7 16.35 13.23 16.06 12.94L12.53 9.41C12.24 9.12 11.76 9.12 11.47 9.41L7.94 12.94C7.65 13.23 7.65 13.71 7.94 14C8.23 14.29 8.71 14.29 9 14L12 11L15 14C15.15 14.14 15.34 14.22 15.53 14.22Z"
        fill={props.subColor || theme.colors.icon01}
      />
    </svg>
  );
}

export default ChevronSquare;
