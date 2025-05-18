import React, { SVGProps } from 'react';

import { colors } from '@/styles/colors';

const Arrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8334 10.0001H4.16669M4.16669 10.0001L10 15.8334M4.16669 10.0001L10 4.16675"
        stroke={props.color || colors.icon03}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
