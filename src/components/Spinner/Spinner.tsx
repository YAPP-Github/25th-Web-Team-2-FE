import { spinner } from './Spinner.css';

import Icon from '@/components/Icon';

interface SpinnerProps {
  width?: number;
  height?: number;
  color?: string;
}
const Spinner = ({ width = 50, height = 50, color }: SpinnerProps) => {
  return <Icon icon="AllEmpty" width={width} height={height} className={spinner} color={color} />;
};

export default Spinner;
