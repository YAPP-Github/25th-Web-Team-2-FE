import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

const Place = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.77515 1.12891C4.28029 1.12891 2.25781 3.38903 2.25781 5.92857C2.25781 8.44822 3.69959 11.187 5.94908 12.2384C6.47347 12.4835 7.07682 12.4835 7.60122 12.2384C9.8507 11.187 11.2925 8.44822 11.2925 5.92857C11.2925 3.38903 9.27 1.12891 6.77515 1.12891ZM6.77515 6.77557C7.39886 6.77557 7.90448 6.26995 7.90448 5.64624C7.90448 5.02253 7.39886 4.51691 6.77515 4.51691C6.15143 4.51691 5.64581 5.02253 5.64581 5.64624C5.64581 6.26995 6.15143 6.77557 6.77515 6.77557Z"
        fill={props.color || colors.icon02}
      />
    </svg>
  );
};

export default Place;
