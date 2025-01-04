import { SVGProps } from 'react';

import theme from '@/styles/theme';

function CheckRound(props: SVGProps<SVGSVGElement>) {
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
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.11 15.37L16.78 9.69998C17.07 9.39998 17.07 8.92999 16.78 8.63999C16.49 8.34999 16.01 8.34999 15.72 8.63999L10.58 13.78L8.28 11.48C7.99 11.19 7.51 11.19 7.22 11.48C6.93 11.77 6.93 12.25 7.22 12.54L10.05 15.37C10.19 15.51 10.38 15.59 10.58 15.59C10.78 15.59 10.97 15.51 11.11 15.37Z"
        fill="white"
      />
    </svg>
  );
}

export default CheckRound;
