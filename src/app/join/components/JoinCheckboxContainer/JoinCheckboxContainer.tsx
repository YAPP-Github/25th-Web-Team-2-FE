import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import JoinCheckbox from './JoinCheckbox/JoinCheckbox';
import { termContainer } from './JoinCheckboxContainer.styles';
import { FormInput } from '../../JoinPage.types';

interface JoinCheckboxContainerProps {
  handleAllCheck: () => void;
}

const JoinCheckboxContainer = ({ handleAllCheck }: JoinCheckboxContainerProps) => {
  const { control, setValue } = useFormContext<FormInput>();

  return (
    <div css={termContainer}>
      <Controller
        name="isAllCheck"
        control={control}
        render={({ field }) => (
          <JoinCheckbox
            label="이용약관에 모두 동의합니다"
            isChecked={field.value}
            onChange={handleAllCheck}
            isAllCheck
          />
        )}
      />

      <Controller
        name="isTermOfService"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <JoinCheckbox
            label="서비스 이용약관 동의"
            isChecked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
              if (!e.target.checked) {
                setValue('isAllCheck', e.target.checked);
              }
            }}
            isRequired
          />
        )}
      />
      <Controller
        name="isPrivacy"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <JoinCheckbox
            label="개인정보 수집 및 이용 동의"
            isChecked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
              if (!e.target.checked) {
                setValue('isAllCheck', e.target.checked);
              }
            }}
            isRequired
          />
        )}
      />
      <Controller
        name="isAdvertise"
        control={control}
        render={({ field }) => (
          <JoinCheckbox
            label="광고성 정보 이메일/SMS 수신 동의"
            isChecked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
              if (!e.target.checked) {
                setValue('isAllCheck', e.target.checked);
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default JoinCheckboxContainer;
