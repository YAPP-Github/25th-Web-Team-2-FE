import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function SearchVersionTwo(props: SVGProps<SVGSVGElement>) {
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
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3 22.0001C21.12 22.0001 20.94 21.9301 20.81 21.8001L18.95 19.9401C18.68 19.6701 18.68 19.2301 18.95 18.9501C19.22 18.6801 19.66 18.6801 19.94 18.9501L21.8 20.8101C22.07 21.0801 22.07 21.5201 21.8 21.8001C21.66 21.9301 21.48 22.0001 21.3 22.0001Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchVersionTwo;
