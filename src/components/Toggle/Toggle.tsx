import { toggle, switchButton } from './Toggle.css';

import { colors } from '@/styles/colors';

interface ToggleProps {
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const Toggle = ({ value, onChange, disabled = false }: ToggleProps) => {
  return (
    <button
      type="button"
      className={toggle}
      style={{
        background: value ? colors.primaryMint : colors.field03,
      }}
      onClick={onChange}
      aria-pressed={value}
      disabled={disabled}
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
