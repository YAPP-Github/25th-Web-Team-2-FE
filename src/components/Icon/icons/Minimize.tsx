import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Minimize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_b_1094_18191)">
        <path
          d="M2.33331 12.3333C2.33331 7.61921 2.33331 5.26218 3.79778 3.79772C5.26225 2.33325 7.61927 2.33325 12.3333 2.33325C16.4673 2.33325 18.7887 2.33325 20.285 3.32092L15.0833 8.52259V6.58325C15.0833 6.16904 14.7475 5.83325 14.3333 5.83325C13.9191 5.83325 13.5833 6.16904 13.5833 6.58325V10.3333C13.5833 10.7475 13.9191 11.0833 14.3333 11.0833H18.0833C18.4975 11.0833 18.8333 10.7475 18.8333 10.3333C18.8333 9.91904 18.4975 9.58325 18.0833 9.58325H16.144L21.3456 4.38158C22.3333 5.87791 22.3333 8.19925 22.3333 12.3333C22.3333 17.0473 22.3333 19.4043 20.8688 20.8688C19.4044 22.3333 17.0474 22.3333 12.3333 22.3333C8.19931 22.3333 5.87798 22.3333 4.38164 21.3456L9.58331 16.1439V18.0833C9.58331 18.4975 9.9191 18.8333 10.3333 18.8333C10.7475 18.8333 11.0833 18.4975 11.0833 18.0833V14.3333C11.0833 13.919 10.7475 13.5833 10.3333 13.5833H6.58331C6.1691 13.5833 5.83331 13.919 5.83331 14.3333C5.83331 14.7475 6.1691 15.0833 6.58331 15.0833H8.52265L3.32098 20.2849C2.33331 18.7886 2.33331 16.4673 2.33331 12.3333Z"
          fill={props.color || theme.colors.icon03}
          fillOpacity="0.5"
        />
      </g>
      <g filter="url(#filter1_b_1094_18191)">
        <path
          d="M15.0833 6.58349C15.0833 6.17349 14.7433 5.83349 14.3333 5.83349C13.9233 5.83349 13.5833 6.17349 13.5833 6.58349V10.3335C13.5833 10.7435 13.9233 11.0835 14.3333 11.0835H18.0833C18.4933 11.0835 18.8333 10.7435 18.8333 10.3335C18.8333 9.92349 18.4933 9.58349 18.0833 9.58349H16.1433L21.3433 4.38349C21.2033 4.20349 21.0433 4.01349 20.8433 3.81349C20.6433 3.61349 20.4533 3.45349 20.2833 3.32349L15.0833 8.52349V6.58349Z"
          fill="white"
          fillOpacity="0.4"
        />
      </g>
      <g filter="url(#filter2_b_1094_18191)">
        <path
          d="M4.38355 21.3433C6.11355 19.6133 7.85355 17.8733 9.58355 16.1433V18.0833C9.58355 18.4933 9.92355 18.8333 10.3335 18.8333C10.7435 18.8333 11.0835 18.4933 11.0835 18.0833V14.3333C11.0835 13.9233 10.7435 13.5833 10.3335 13.5833H6.58355C6.17355 13.5833 5.83355 13.9233 5.83355 14.3333C5.83355 14.7433 6.17355 15.0833 6.58355 15.0833H8.52355C6.79355 16.8133 5.05355 18.5533 3.32355 20.2833C3.45355 20.4633 3.61355 20.6533 3.81355 20.8533C4.01355 21.0533 4.20355 21.2133 4.38355 21.3433Z"
          fill="white"
          fillOpacity="0.4"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_1094_18191"
          x="-13.6667"
          y="-13.6667"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="8" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1094_18191" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1094_18191"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_b_1094_18191"
          x="9.58331"
          y="-0.676514"
          width="15.76"
          height="15.76"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1094_18191" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1094_18191"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_b_1094_18191"
          x="-0.676453"
          y="9.58325"
          width="15.76"
          height="15.76"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1094_18191" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1094_18191"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Minimize;
