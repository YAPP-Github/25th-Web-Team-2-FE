import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Timer(props: SVGProps<SVGSVGElement>) {
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
        d="M17.39 15.67L13.35 12H10.64L6.59999 15.67C5.46999 16.69 5.09999 18.26 5.64999 19.68C6.19999 21.09 7.53999 22 9.04999 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79999 18.14 9.49999 17.83 9.49999 17.46C9.49999 17.09 9.80999 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Timer;
