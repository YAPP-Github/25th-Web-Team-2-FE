import * as Select from '@radix-ui/react-select';
import React, { forwardRef, useState } from 'react';

import {
  formMessage,
  selectContent,
  selectInputContainer,
  selectItem,
  selectTrigger,
} from './SelectForm.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface SelectFormProps {
  field: {
    name: string;
    value: string | null;
    onChange: (value: string) => void;
    onBlur: VoidFunction;
  };
  fieldState: {
    error?: {
      message?: string;
    };
  };
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  showErrorMessage?: boolean;
}

const SelectForm = forwardRef<HTMLButtonElement, SelectFormProps>(
  (
    { field, fieldState, options, placeholder = '선택', disabled = false, showErrorMessage = true },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!options?.length) return null;

    return (
      <div className={selectInputContainer}>
        <Select.Root
          value={field?.value ?? undefined}
          onValueChange={field?.onChange}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              field.onBlur();
            }
          }}
          disabled={disabled}
        >
          <Select.Trigger
            ref={ref}
            className={`${selectTrigger.default} ${disabled ? selectTrigger.disabled : ''} ${
              fieldState?.error ? selectTrigger.error : ''
            }`}
          >
            {disabled && field.name === 'timeRequired' ? (
              <span style={{ color: colors.text02 }}>본문 참고</span>
            ) : (
              <Select.Value placeholder={disabled ? '본문 참고' : placeholder} />
            )}
            <Select.Icon asChild>
              <Icon
                icon="Chevron"
                width={24}
                height={24}
                color={disabled ? colors.text02 : colors.icon03}
                rotate={isOpen ? 180 : 0}
              />
            </Select.Icon>
          </Select.Trigger>
          {!disabled && (
            <Select.Portal>
              <Select.Content className={selectContent} position="popper" sideOffset={4}>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  {options?.map((option) => (
                    <Select.Item key={option.value} value={option.value} className={selectItem}>
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          )}
        </Select.Root>
        {fieldState?.error && showErrorMessage && (
          <p className={formMessage}>{fieldState.error.message}</p>
        )}
      </div>
    );
  },
);

SelectForm.displayName = 'SelectForm';

export default SelectForm;
