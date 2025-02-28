import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Copy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.33331 12.5002H4.66665C4.31302 12.5002 3.97389 12.3597 3.72384 12.1096C3.47379 11.8596 3.33331 11.5205 3.33331 11.1668V5.16683C3.33331 4.81321 3.47379 4.47407 3.72384 4.22402C3.97389 3.97397 4.31302 3.8335 4.66665 3.8335H10.6666C11.0203 3.8335 11.3594 3.97397 11.6095 4.22402C11.8595 4.47407 12 4.81321 12 5.16683V5.8335M9.33331 8.50016H15.3333C16.0697 8.50016 16.6666 9.09712 16.6666 9.8335V15.8335C16.6666 16.5699 16.0697 17.1668 15.3333 17.1668H9.33331C8.59693 17.1668 7.99998 16.5699 7.99998 15.8335V9.8335C7.99998 9.09712 8.59693 8.50016 9.33331 8.50016Z"
        stroke={props.color || colors.icon03}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Copy;
