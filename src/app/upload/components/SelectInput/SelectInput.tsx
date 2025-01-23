import { css, Theme } from '@emotion/react';
import * as Select from '@radix-ui/react-select';
import { useState } from 'react';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface SelectInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  referToDetailsChecked?: boolean;
  error?: boolean;
}

const SelectInput = ({
  value,
  onChange,
  options,
  placeholder = '선택',
  referToDetailsChecked = false,
  error = false,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root
      value={referToDetailsChecked ? undefined : value}
      onValueChange={onChange}
      onOpenChange={setIsOpen}
      disabled={referToDetailsChecked}
    >
      <Select.Trigger
        css={[selectTrigger, referToDetailsChecked && selectDisabled, error && selectError]}
        disabled={referToDetailsChecked}
      >
        <Select.Value placeholder={referToDetailsChecked ? '본문 참고' : placeholder} />
        <Select.Icon asChild>
          <Icon
            icon="Chevron"
            width={24}
            height={24}
            color={referToDetailsChecked ? colors.text02 : colors.icon03}
            rotate={isOpen ? 180 : 0}
          />
        </Select.Icon>
      </Select.Trigger>
      {!referToDetailsChecked && (
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
  );
};

export default SelectInput;

const selectTrigger = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text06};

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 4.8rem;

  padding: 1.3rem 1.6rem;

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  &[data-placeholder] {
    ${theme.fonts.label.large.R14};
    color: ${theme.colors.text02};
  }

  &[data-state='open'] {
    border: 0.1rem solid ${theme.colors.primaryMint};
  }

  :focus {
    border: 0.1rem solid ${theme.colors.primaryMint};
  }
`;

const selectDisabled = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  color: ${theme.colors.text02};
  cursor: not-allowed;
  border: 0.1rem solid ${theme.colors.line02};
`;

const selectContent = (theme: Theme) => css`
  width: 45.2rem;
  height: 26rem;

  padding: 1rem 0.8rem;

  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;

  position: relative;
`;

const selectItem = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};

  height: 3.6rem;

  border-radius: 1.2rem;

  padding: 0.7rem 2rem;

  cursor: pointer;

  &[data-highlighted] {
    background-color: ${theme.colors.field02};
    border: none;
    outline: none;
  }

  &[data-state='checked'] {
    background-color: ${theme.colors.primaryTinted};
    border: 0.1rem solid ${theme.colors.lineTinted};
    color: ${theme.colors.textPrimary};
  }
`;

const selectError = (theme: Theme) => css`
  border: 0.1rem solid ${theme.colors.textAlert};
`;
