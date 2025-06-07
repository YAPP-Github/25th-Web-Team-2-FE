import { ButtonHTMLAttributes, CSSProperties, forwardRef } from 'react';

import { buttonRecipe } from './Button.css';
import Spinner from '../Spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium';
  children: React.ReactNode;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      children,
      width = '100%',
      height = 'fit-content',
      isLoading = false,
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const recipeClasses = buttonRecipe({ variant, size });

    return (
      <button
        ref={ref}
        className={className ? `${recipeClasses} ${className}` : recipeClasses}
        disabled={disabled || isLoading}
        onClick={onClick}
        style={{ width, height }}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
