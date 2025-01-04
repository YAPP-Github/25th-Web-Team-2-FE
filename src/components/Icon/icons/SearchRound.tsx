import { SVGProps } from 'react';

import theme from '@/styles/theme';

function SearchRound(props: SVGProps<SVGSVGElement>) {
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
        d="M11.01 20.02C15.9861 20.02 20.02 15.9861 20.02 11.01C20.02 6.03391 15.9861 2 11.01 2C6.03391 2 2 6.03391 2 11.01C2 15.9861 6.03391 20.02 11.01 20.02Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.99 18.95C21.66 18.34 20.96 18 20.02 18C19.31 18 18.7 18.29 18.34 18.79C17.98 19.29 17.9 19.96 18.12 20.63C18.55 21.93 19.3 22.22 19.71 22.27C19.77 22.28 19.83 22.28 19.9 22.28C20.34 22.28 21.02 22.09 21.68 21.1C22.21 20.33 22.31 19.56 21.99 18.95Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchRound;
