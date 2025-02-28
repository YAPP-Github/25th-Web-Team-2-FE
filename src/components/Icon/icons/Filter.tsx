import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Filter(props: SVGProps<SVGSVGElement>) {
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
        d="M21.3 7.58005H15.72C15.33 7.58005 15.02 7.27005 15.02 6.88005C15.02 6.49005 15.33 6.18005 15.72 6.18005H21.3C21.69 6.18005 22 6.49005 22 6.88005C22 7.27005 21.69 7.58005 21.3 7.58005Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.42 7.58005H2.7C2.31 7.58005 2 7.27005 2 6.88005C2 6.49005 2.31 6.18005 2.7 6.18005H6.42C6.81 6.18005 7.12 6.49005 7.12 6.88005C7.12 7.27005 6.8 7.58005 6.42 7.58005Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.14 10.8301C12.3215 10.8301 14.09 9.06158 14.09 6.88005C14.09 4.69853 12.3215 2.93005 10.14 2.93005C7.95848 2.93005 6.19 4.69853 6.19 6.88005C6.19 9.06158 7.95848 10.8301 10.14 10.8301Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3 17.81H17.58C17.19 17.81 16.88 17.5 16.88 17.11C16.88 16.72 17.19 16.41 17.58 16.41H21.3C21.69 16.41 22 16.72 22 17.11C22 17.5 21.69 17.81 21.3 17.81Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.28 17.81H2.7C2.31 17.81 2 17.5 2 17.11C2 16.72 2.31 16.41 2.7 16.41H8.28C8.67 16.41 8.98 16.72 8.98 17.11C8.98 17.5 8.66 17.81 8.28 17.81Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.86 21.07C16.0415 21.07 17.81 19.3016 17.81 17.12C17.81 14.9385 16.0415 13.17 13.86 13.17C11.6785 13.17 9.91 14.9385 9.91 17.12C9.91 19.3016 11.6785 21.07 13.86 21.07Z"
        fill={props.color || colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Filter;
