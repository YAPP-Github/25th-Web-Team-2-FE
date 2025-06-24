import React, { SVGProps } from 'react';

import { colors } from '@/styles/colors';

const Arrow = (props: SVGProps<SVGSVGElement>) => {
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
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={props.color || colors.icon03}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
