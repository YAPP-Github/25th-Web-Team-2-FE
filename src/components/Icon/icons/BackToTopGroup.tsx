import { SVGProps } from 'react';

import theme from '@/styles/theme';

function BackToTopGroup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.00001 20L9.00001 7.4M9.00001 7.4L14.4 12.8M9.00001 7.4L3.60001 12.8"
        stroke={props.color || theme.colors.icon03}
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2 2H9H1.8"
        stroke={props.color || theme.colors.icon03}
        stroke-width="2.7"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default BackToTopGroup;
