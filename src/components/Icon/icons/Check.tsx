import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="ic_all_check">
        <path
          id="Vector"
          d="M6 12L10.2426 16.2426L18.727 7.75732"
          stroke={props.color || colors.icon03}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default Check;
