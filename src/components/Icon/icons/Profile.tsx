import { SVGProps } from 'react';

import { colors } from '@/styles/colors';

function Profile(props: SVGProps<SVGSVGElement>) {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM15.3 8.7C15.3 10.5225 13.8225 12 12 12C10.1775 12 8.7 10.5225 8.7 8.7C8.7 6.87746 10.1775 5.4 12 5.4C13.8225 5.4 15.3 6.87746 15.3 8.7ZM12 21.35C13.9624 21.35 15.7837 20.7454 17.2876 19.7123C17.9519 19.256 18.2357 18.3869 17.8495 17.6796C17.0489 16.2133 15.3993 15.3 11.9999 15.3C8.60066 15.3 6.95096 16.2132 6.15035 17.6795C5.76415 18.3868 6.04801 19.256 6.71225 19.7123C8.2162 20.7454 10.0375 21.35 12 21.35Z"
        fill={props.color || colors.icon03}
      />
    </svg>
  );
}

export default Profile;
