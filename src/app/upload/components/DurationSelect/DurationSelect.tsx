import * as Select from '@radix-ui/react-select';

import { css, Theme } from '@emotion/react';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import { useState } from 'react';

interface DurationSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const durationMinutesOptions = [
  { label: '30분 미만', value: 'LESS_30M' },
  { label: '약 30분', value: 'ABOUT_30M' },
  { label: '약 1시간', value: 'ABOUT_1H' },
  { label: '약 1시간 30분', value: 'ABOUT_1H30M' },
  { label: '약 2시간', value: 'ABOUT_2H' },
  { label: '약 2시간 30분', value: 'ABOUT_2H30M' },
  { label: '약 3시간', value: 'ABOUT_3H' },
  { label: '약 3시간 30분', value: 'ABOUT_3H30M' },
  { label: '약 4시간', value: 'ABOUT_4H' },
];

const DurationSelect = ({ value, onChange }: DurationSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select.Root value={value} onValueChange={onChange} onOpenChange={setIsOpen}>
      <Select.Trigger css={selectTrigger}>
        <Select.Value placeholder="1회당 시간 입력" />
        <Select.Icon asChild>
          <Icon
            icon="Chevron"
            width={24}
            height={24}
            color={colors.icon03}
            rotate={isOpen ? 180 : 0}
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content css={selectContent} position="popper" sideOffset={4}>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {durationMinutesOptions.map((option) => (
              <Select.Item key={option.value} value={option.value} css={selectItem}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default DurationSelect;

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
`;

const selectContent = (theme: Theme) => css`
  width: 45.2rem;
  height: 26rem;

  margin-top: 0.6rem;
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
