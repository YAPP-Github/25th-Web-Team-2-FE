import { useRef, useTransition } from 'react';
import { Control, Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import {
  inputContainer,
  inputLabel,
  errorMessage,
  joinInput,
  requiredStar,
  tipWrapper,
  infoContainer,
  inputWrapper,
  confirmButton,
  tipAlert,
} from './ButtonInput.css';

interface ButtonInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onClick: () => void;
  isLoading: boolean;
  title?: string;
  required?: boolean;
  className?: string;
  tip?: string;
  isTip?: boolean;
  isButtonHidden?: boolean;
  placeholder?: string;
}

const ButtonInput = <T extends FieldValues>({
  control,
  name,
  onClick,
  isLoading,
  title,
  required,
  className,
  tip,
  isTip = false,
  isButtonHidden = false,
  placeholder = '이메일 입력',
}: ButtonInputProps<T>) => {
  const { trigger } = useFormContext<T>();
  const validateButtonRef = useRef<HTMLButtonElement | null>(null);
  const [_, startTransition] = useTransition();

  return (
    <div className={inputContainer}>
      {title && (
        <label className={inputLabel} htmlFor={name}>
          <span>{title}</span>
          {required && <span className={requiredStar}>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const isButtonDisabled = !field.value || fieldState.invalid;

          const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(e);

            startTransition(() => {
              trigger(name);
            });
          };

          const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (validateButtonRef.current && validateButtonRef.current.contains(e.relatedTarget)) {
              return;
            }

            field.onBlur();
          };

          return (
            <>
              <div className={inputWrapper}>
                <input
                  {...field}
                  id={name}
                  style={{ width: '100%' }}
                  className={className ? className : joinInput}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {!isButtonHidden && (
                  <button
                    type="button"
                    className={confirmButton}
                    disabled={isButtonDisabled || isLoading}
                    onClick={onClick}
                    onMouseDown={(e) => e.preventDefault()}
                    ref={validateButtonRef}
                  >
                    {isLoading ? '확인 중...' : '중복 확인'}
                  </button>
                )}
              </div>
              <div className={infoContainer}>
                {fieldState.error ? (
                  <span className={errorMessage}>{fieldState.error.message}</span>
                ) : (
                  tip && (
                    <div className={tipWrapper}>
                      {isTip && <span className={tipAlert}>Tip</span>}
                      <span>{tip}</span>
                    </div>
                  )
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default ButtonInput;
