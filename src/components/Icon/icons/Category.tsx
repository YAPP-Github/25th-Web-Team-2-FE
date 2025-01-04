import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Category(props: SVGProps<SVGSVGElement>) {
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
        d="M18.67 2H16.77C14.59 2 13.44 3.15 13.44 5.33V7.23C13.44 9.41 14.59 10.56 16.77 10.56H18.67C20.85 10.56 22 9.41 22 7.23V5.33C22 3.15 20.85 2 18.67 2Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.71 22C20.0793 22 22 20.0793 22 17.71C22 15.3407 20.0793 13.42 17.71 13.42C15.3407 13.42 13.42 15.3407 13.42 17.71C13.42 20.0793 15.3407 22 17.71 22Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Category;
