import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Archive(props: SVGProps<SVGSVGElement>) {
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
        d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2ZM15.01 9.75C14.04 10.1 13.02 10.28 12 10.28C10.98 10.28 9.96001 10.1 8.99001 9.75C8.60001 9.61 8.40001 9.18 8.54001 8.79C8.69001 8.4 9.12001 8.2 9.51001 8.34C11.12 8.92 12.89 8.92 14.5 8.34C14.89 8.2 15.32 8.4 15.46 8.79C15.6 9.18 15.4 9.61 15.01 9.75Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Archive;
