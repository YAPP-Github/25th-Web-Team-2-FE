import { toggle, switchButton } from './Toggle.css';

import { colors } from '@/styles/colors';

interface ToggleProps {
  value: boolean;
  onChange: () => void;
}

const Toggle = ({ value, onChange }: ToggleProps) => {
  return (
    <button
      type="button"
      className={toggle}
      style={{
        background: value ? colors.primaryMint : colors.field03,
      }}
      onClick={onChange}
      aria-pressed={value}
    >
      <span
        className={switchButton}
        style={{
          transform: value ? 'translateX(2rem)' : 'translateX(0)',
        }}
      />
    </button>
  );
};

export default Toggle;
