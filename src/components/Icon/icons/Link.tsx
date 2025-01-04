import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Link(props: SVGProps<SVGSVGElement>) {
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
        d="M19.07 14.24C18.78 14.53 18.32 14.53 18.04 14.24C17.75 13.95 17.75 13.49 18.04 13.21C20.04 11.21 20.04 7.95998 18.04 5.96998C16.04 3.97998 12.79 3.96998 10.8 5.96998C8.81 7.96998 8.8 11.22 10.8 13.21C11.09 13.5 11.09 13.96 10.8 14.24C10.51 14.53 10.05 14.53 9.77 14.24C7.2 11.67 7.2 7.48998 9.77 4.92998C12.34 2.36998 16.52 2.35998 19.08 4.92998C21.64 7.49998 21.64 11.67 19.07 14.24Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.93 9.75998C5.22 9.46998 5.68 9.46998 5.96 9.75998C6.25 10.05 6.25 10.51 5.96 10.79C3.96 12.79 3.96 16.04 5.96 18.03C7.96 20.02 11.21 20.03 13.2 18.03C15.19 16.03 15.2 12.78 13.2 10.79C12.91 10.5 12.91 10.04 13.2 9.75998C13.49 9.46998 13.95 9.46998 14.23 9.75998C16.8 12.33 16.8 16.51 14.23 19.07C11.66 21.63 7.48 21.64 4.92 19.07C2.36 16.5 2.36 12.33 4.93 9.75998Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Link;
