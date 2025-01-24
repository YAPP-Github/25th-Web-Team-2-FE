import { css, Theme } from '@emotion/react';
import * as Select from '@radix-ui/react-select';
import React, { forwardRef, useState } from 'react';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface SelectInputProps {
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

const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  (
    { field, fieldState, options, placeholder = '선택', disabled = false, showErrorMessage = true },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={selectInputContainer}>
        <Select.Root
          value={field?.value ?? undefined}
          onValueChange={field?.onChange}
          onOpenChange={setIsOpen}
          disabled={disabled}
        >
          <Select.Trigger
            ref={ref}
            css={(theme) => selectTrigger(theme, disabled, fieldState?.error ? 'error' : '')}
            onBlur={field?.onBlur}
          >
            <Select.Value placeholder={placeholder} />
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
              <Select.Content css={selectContent} position="popper" sideOffset={4}>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  {options.map((option) => (
                    <Select.Item key={option.value} value={option.value} css={selectItem}>
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
          <p css={(theme) => formMessage(theme)}>{fieldState.error.message}</p>
        )}
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;

const selectInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const selectTrigger = (theme: Theme, disabled: boolean, status: string) => css`
  ${theme.fonts.label.large.R14};

  width: 100%;
  height: 4.8rem;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid ${status === 'error' ? theme.colors.textAlert : theme.colors.line01};
  border-radius: 1.2rem;
  color: ${disabled ? theme.colors.text02 : theme.colors.text06};
  background-color: ${disabled ? theme.colors.field02 : 'transparent'};

  display: flex;
  align-items: center;
  justify-content: space-between;

  &[data-placeholder] {
    color: ${theme.colors.text02};
  }

  &:focus {
    border-color: ${status === 'error' ? theme.colors.textAlert : theme.colors.lineTinted};
    outline: none;
  }
`;

const selectContent = (theme: Theme) => css`
  width: 45.2rem;
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.1);
`;

const selectItem = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  height: 3.6rem;
  padding: 0.7rem 2rem;
  cursor: pointer;

  &[data-highlighted] {
    background-color: ${theme.colors.field02};
  }

  &[data-state='checked'] {
    background-color: ${theme.colors.primaryTinted};
    color: ${theme.colors.textPrimary};
  }
`;

const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
`;
