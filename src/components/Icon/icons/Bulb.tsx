import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Bulb(props: SVGProps<SVGSVGElement>) {
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
        d="M19.21 6.36001C18.17 4.26001 16.16 2.71001 13.83 2.20001C11.39 1.66001 8.88997 2.24001 6.97997 3.78001C5.05997 5.31001 3.96997 7.60001 3.96997 10.05C3.96997 12.64 5.51997 15.35 7.85997 16.92V17.75C7.84997 18.03 7.83997 18.46 8.17997 18.81C8.52997 19.17 9.04997 19.21 9.45997 19.21H14.59C15.13 19.21 15.54 19.06 15.82 18.78C16.2 18.39 16.19 17.89 16.18 17.62V16.92C19.28 14.83 21.23 10.42 19.21 6.36001Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.26 22C15.2 22 15.13 21.99 15.07 21.97C13.06 21.4 10.95 21.4 8.93997 21.97C8.56997 22.07 8.17997 21.86 8.07997 21.49C7.96997 21.12 8.18997 20.73 8.55997 20.63C10.82 19.99 13.2 19.99 15.46 20.63C15.83 20.74 16.05 21.12 15.94 21.49C15.84 21.8 15.56 22 15.26 22Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Bulb;
