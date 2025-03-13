import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function X(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 1L1 11M1 1L11 11"
        stroke={props.color || colors.icon03}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default X;
