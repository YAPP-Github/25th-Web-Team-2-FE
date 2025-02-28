import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function TriangleArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.68 14.48L15.47 11.27L13.51 9.29999C12.68 8.46999 11.33 8.46999 10.5 9.29999L5.32 14.48C4.64 15.16 5.12999 16.32 6.07999 16.32H11.69H17.92C18.88 16.32 19.36 15.16 18.68 14.48Z"
        stroke={props.color || colors.icon03}
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TriangleArrow;
