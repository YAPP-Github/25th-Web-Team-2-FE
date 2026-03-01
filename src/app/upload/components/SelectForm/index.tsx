import * as Select from '@radix-ui/react-select';
import React, { useState } from 'react';
import { ControllerRenderProps, FieldError, useFormContext } from 'react-hook-form';

import {
  formMessage,
  selectContent,
  selectInputContainer,
  selectItem,
  selectTrigger,
} from './SelectForm.css';

import Icon from '@/components/Icon';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

interface SelectFormProps {
  field: ControllerRenderProps<UploadExperimentPostSchemaType, 'count' | 'timeRequired'>;
  options: { label: string; value: string }[];
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  showErrorMessage?: boolean;
}

const SelectForm = ({
  field,
  error,
  options,
  placeholder = '선택',
  disabled = false,
  showErrorMessage = true,
}: SelectFormProps) => {
  const { setValue } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);

  if (!options?.length) return null;

  return (
    <div className={selectInputContainer}>
      <Select.Root
        key={field.value ?? field.name}
        value={field.value ? String(field.value) : undefined}
        onValueChange={(value) => {
          setValue(field.name, value, { shouldValidate: true, shouldDirty: true });
        }}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            field.onBlur();
          }
        }}
        disabled={disabled}
      >
        <Select.Trigger
          ref={field.ref}
          className={`${selectTrigger.default} ${disabled ? selectTrigger.disabled : ''} ${
            error ? selectTrigger.error : ''
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
                  <Select.Item
                    key={option.value}
                    value={String(option.value)}
                    className={selectItem}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select.Portal>
        )}
      </Select.Root>
      {error && showErrorMessage && <p className={formMessage}>{error.message}</p>}
    </div>
  );
};

export default SelectForm;
