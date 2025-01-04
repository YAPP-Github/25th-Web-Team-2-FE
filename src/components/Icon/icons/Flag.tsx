import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Bell(props: SVGProps<SVGSVGElement>) {
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
        d="M15.2 7.16L7.20001 3.7V2.75C7.20001 2.34 6.86001 2 6.45001 2C6.04001 2 5.70001 2.34 5.70001 2.75V21.25C5.70001 21.66 6.04001 22 6.45001 22C6.86001 22 7.20001 21.66 7.20001 21.25V17.29L15.42 13.23C15.42 13.23 15.42 13.23 15.43 13.23C17.09 12.37 17.98 11.26 17.93 10.09C17.88 8.92 16.91 7.88 15.2 7.16Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Bell;
