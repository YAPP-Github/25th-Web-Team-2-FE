import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Building(props: SVGProps<SVGSVGElement>) {
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
        d="M15 7.06997C15 6.39997 14.67 5.77997 14.11 5.40997L10.11 2.73997C9.44 2.28997 8.56 2.28997 7.89 2.73997L3.89 5.40997C3.34 5.77997 3 6.39997 3 7.06997V12.75C3 13.03 3.22 13.25 3.5 13.25H14.5C14.78 13.25 15 13.03 15 12.75V7.06997ZM9 10.75C8.04 10.75 7.25 9.95997 7.25 8.99997C7.25 8.03997 8.04 7.24997 9 7.24997C9.96 7.24997 10.75 8.03997 10.75 8.99997C10.75 9.95997 9.96 10.75 9 10.75Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 21.25H20.73V18.25C21.68 17.94 22.37 17.05 22.37 16V14C22.37 12.69 21.3 11.62 19.99 11.62C18.68 11.62 17.61 12.69 17.61 14V16C17.61 17.04 18.29 17.92 19.22 18.24V21.25H15V15.25C15 14.97 14.78 14.75 14.5 14.75H3.5C3.22 14.75 3 14.97 3 15.25V21.25H2C1.59 21.25 1.25 21.59 1.25 22C1.25 22.41 1.59 22.75 2 22.75H19.93C19.95 22.75 19.96 22.76 19.98 22.76C20 22.76 20.01 22.75 20.03 22.75H22C22.41 22.75 22.75 22.41 22.75 22C22.75 21.59 22.41 21.25 22 21.25ZM8.25 18.25C8.25 17.84 8.59 17.5 9 17.5C9.41 17.5 9.75 17.84 9.75 18.25V21.25H8.25V18.25Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Building;
