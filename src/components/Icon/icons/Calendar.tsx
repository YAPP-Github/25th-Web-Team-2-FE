import { CustomSVGProps } from '..';

import theme from '@/styles/theme';

function Calendar(props: CustomSVGProps) {
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
        d="M1.66669 10C1.66669 6.85734 1.66669 5.286 2.643 4.30968C3.61931 3.33337 5.19066 3.33337 8.33335 3.33337H11.6667C14.8094 3.33337 16.3807 3.33337 17.357 4.30968C18.3334 5.286 18.3334 6.85734 18.3334 10V11.6667C18.3334 14.8094 18.3334 16.3808 17.357 17.3571C16.3807 18.3334 14.8094 18.3334 11.6667 18.3334H8.33335C5.19066 18.3334 3.61931 18.3334 2.643 17.3571C1.66669 16.3808 1.66669 14.8094 1.66669 11.6667V10Z"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        fill={props.subcolor || theme.colors.icon01}
      />
      <path
        d="M5.83331 3.33337V2.08337"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.1667 3.33337V2.08337"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="13.75"
        cy="13.75"
        r="1.25"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.5"
      />
      <path
        d="M2.08331 7.5H17.9166"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Calendar;
