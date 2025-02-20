import { spinner } from './Spinner.css';

import Icon from '@/components/Icon';

interface SpinnerProps {
  width?: number;
  height?: number;
}
const Spinner = ({ width = 50, height = 50 }: SpinnerProps) => {
  return <Icon icon="AllEmpty" width={width} height={height} className={spinner} />;
};

export default Spinner;
