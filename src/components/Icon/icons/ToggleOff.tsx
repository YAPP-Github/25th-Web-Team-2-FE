import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function ToggleOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? '32'}
      height={props.height ?? '38'}
      viewBox="0 -2 32 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="토글 스위치 꺼짐"
      transform="translate(10, 1)"
    >
      <rect y="6" width="32" height="18" rx="9" fill={props.color || colors.field05} />
      <g>
        <circle cx="9" cy="15" r="7" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_3107_24218"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0.1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3107_24218" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3107_24218"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default ToggleOff;
