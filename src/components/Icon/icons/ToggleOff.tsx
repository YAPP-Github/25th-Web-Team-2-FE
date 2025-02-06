import { SVGProps } from 'react';

import theme from '@/styles/theme';

function ToggleOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="42"
      height="38"
      viewBox="0 0 42 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="10" y="6" width="32" height="18" rx="9" fill={props.color || theme.colors.field05} />
      <g filter="url(#filter0_d_3107_24218)">
        <circle cx="19" cy="15" r="7" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_3107_24218"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
