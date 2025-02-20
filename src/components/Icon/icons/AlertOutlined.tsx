import { CustomSVGProps } from '..';

import { colors } from '@/styles/colors';

function AlertOutlined(props: CustomSVGProps) {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1172_12777)">
        <path
          d="M6.39995 5.04118V6.81896M6.39995 8.59673H6.40439M10.8444 6.81896C10.8444 9.27355 8.85455 11.2634 6.39995 11.2634C3.94535 11.2634 1.95551 9.27355 1.95551 6.81896C1.95551 4.36436 3.94535 2.37451 6.39995 2.37451C8.85455 2.37451 10.8444 4.36436 10.8444 6.81896Z"
          stroke={props.color || colors.icon03}
          strokeWidth="1.28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1172_12777">
          <rect
            width="10.6667"
            height="10.6667"
            fill="white"
            transform="translate(1.06665 1.48535)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default AlertOutlined;
