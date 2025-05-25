import { colors } from '@/styles/colors';

const ArrowTooltip = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      width="20"
      height="8"
      viewBox="0 0 20 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      <path
        d="M3.43441 7.50745L2.35232 8.75H4H16H17.6477L16.5656 7.50745L11.7989 2.03391C11.7989 2.03389 11.7989 2.03387 11.7988 2.03385C11.3265 1.49143 10.6407 1.25 10 1.25C9.35926 1.25 8.67346 1.49143 8.20115 2.03385C8.20113 2.03387 8.20112 2.03389 8.2011 2.03391L3.43441 7.50745Z"
        fill="white"
        stroke={colors.line01}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ArrowTooltip;
