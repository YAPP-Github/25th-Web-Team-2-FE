import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Like(props: SVGProps<SVGSVGElement>) {
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
        d="M8.39001 18.49V8.32998C8.39001 7.92998 8.51001 7.53998 8.73001 7.20998L11.46 3.14998C11.89 2.49998 12.96 2.03998 13.87 2.37998C14.85 2.70998 15.5 3.80997 15.29 4.78997L14.77 8.05998C14.73 8.35998 14.81 8.62998 14.98 8.83998C15.15 9.02998 15.4 9.14997 15.67 9.14997H19.78C20.57 9.14997 21.25 9.46997 21.65 10.03C22.03 10.57 22.1 11.27 21.85 11.98L19.39 19.47C19.08 20.71 17.73 21.72 16.39 21.72H12.49C11.82 21.72 10.88 21.49 10.45 21.06L9.17001 20.07C8.68001 19.7 8.39001 19.11 8.39001 18.49Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.21 6.38H4.18C2.63 6.38 2 6.98 2 8.46V18.52C2 20 2.63 20.6 4.18 20.6H5.21C6.76 20.6 7.39 20 7.39 18.52V8.46C7.39 6.98 6.76 6.38 5.21 6.38Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Like;
