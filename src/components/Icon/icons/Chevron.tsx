import { SVGProps } from 'react';

import theme from '@/styles/theme';

function Chevron(props: SVGProps<SVGSVGElement>) {
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
        d="M12.7434 15.2174L17.6949 10.2659C18.1017 9.84513 18.1017 9.18586 17.6949 8.77908C17.2881 8.3723 16.6148 8.3723 16.2081 8.77908L12 12.9871L7.79193 8.77908C7.38515 8.3723 6.71186 8.3723 6.30508 8.77908C5.89831 9.18586 5.89831 9.85915 6.30508 10.2659L11.2566 15.2174C11.467 15.4278 11.7335 15.526 12 15.526C12.2665 15.526 12.533 15.4278 12.7434 15.2174Z"
        fill={props.color || theme.colors.icon03}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default Chevron;
