import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function MenuDots(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="4"
      height="12"
      viewBox="0 0 4 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="메뉴 더보기"
      {...props}
    >
      <path
        d="M2.00065 2.66667C1.26427 2.66667 0.667318 2.06971 0.667318 1.33333C0.667318 0.596954 1.26427 -9.047e-08 2.00065 -5.82819e-08C2.73703 -2.60937e-08 3.33398 0.596954 3.33398 1.33333C3.33398 2.06971 2.73703 2.66667 2.00065 2.66667Z"
        fill={props.color || colors.text03}
      />
      <path
        d="M2.00065 7.33333C1.26427 7.33333 0.667318 6.73638 0.667318 6C0.667318 5.26362 1.26427 4.66667 2.00065 4.66667C2.73703 4.66667 3.33398 5.26362 3.33398 6C3.33398 6.73638 2.73703 7.33333 2.00065 7.33333Z"
        fill={props.color || colors.text03}
      />
      <path
        d="M2.00065 12C1.26427 12 0.667317 11.403 0.667317 10.6667C0.667317 9.93029 1.26427 9.33333 2.00065 9.33333C2.73703 9.33333 3.33398 9.93029 3.33398 10.6667C3.33398 11.403 2.73703 12 2.00065 12Z"
        fill={props.color || colors.text03}
      />
    </svg>
  );
}

export default MenuDots;
