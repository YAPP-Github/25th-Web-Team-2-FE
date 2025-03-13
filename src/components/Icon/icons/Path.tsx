import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Path(props: SVGProps<SVGSVGElement>) {
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
        d="M20.02 10.7L17.9 12.04C17.5 12.29 16.99 12.23 16.66 11.9L12.13 7.37004C11.8 7.04004 11.74 6.53004 11.99 6.13004L13.33 4.01004C14.15 2.72004 15.79 2.66004 17 3.86004L20.18 7.04004C21.3 8.17004 21.23 9.93004 20.02 10.7Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.71 19.95L5.99 20.97C5.91232 20.9804 5.83565 20.9877 5.76005 20.9921C5.07492 21.0325 4.90504 20.2249 5.39034 19.7396L7.98 17.15C8.3 16.84 8.3 16.35 7.98 16.04C7.68 15.73 7.19 15.73 6.87 16.04L4.28035 18.6296C3.79504 19.1149 2.99492 18.9444 3.03133 18.259C3.03515 18.1871 3.04135 18.1141 3.05 18.04L4.08 9.32C4.34 7.14 5.14 6.42 7.44 6.56L8.94 6.65C9.43 6.68 9.89 6.89 10.24 7.24L16.79 13.79C17.14 14.14 17.35 14.6 17.37 15.09L17.46 16.59C17.69 18.9 16.9 19.7 14.71 19.95Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Path;
