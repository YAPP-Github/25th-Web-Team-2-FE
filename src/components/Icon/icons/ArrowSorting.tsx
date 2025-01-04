import { SVGProps } from 'react';

import theme from '@/styles/theme';

function ArrowSorting(props: SVGProps<SVGSVGElement>) {
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
        d="M15.9998 18L15.9998 6M15.9998 6L19.9998 10.125M15.9998 6L11.9998 10.125"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 18M8 18L12 13.875M8 18L4 13.875"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowSorting;
