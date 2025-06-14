import { useState } from 'react';
import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form';

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import ButtonInput from '@/components/ButtonInput/ButtonInput';

interface ContactEmailInputProps<T extends FieldValues> {
  contactEmailField: Path<T>;
  verifiedEmailField: Path<T>;
  helperText?: string;
  isTip?: boolean;
  title?: string;
  required?: boolean;
  openBottomSheet?: () => void;
}

const ContactEmailInput = <T extends FieldValues>({
  contactEmailField,
  verifiedEmailField,
  helperText,
  isTip = false,
  title,
  required = false,
  openBottomSheet,
}: ContactEmailInputProps<T>) => {
  const { control, getValues, setValue } = useFormContext<T>();
  const verifiedContactEmail = useWatch({ name: verifiedEmailField, control });
  const contactEmail = useWatch({ name: contactEmailField, control });

  const {
    mutate: checkValidEmail,
    isPending: isLoadingCheck,
    isError: isEmailDuplicateError,
  } = useCheckValidEmailInfoMutation();

  const [isValidToastOpen, setIsValidToastOpen] = useState(false);

  const isVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues(contactEmailField), {
      onSuccess: () => {
        setValue(verifiedEmailField, getValues(contactEmailField));
        openBottomSheet?.();
      },
      onSettled: () => {
        setIsValidToastOpen(true);
      },
    });
  };

  return (
    <ButtonInput<T>
      title={title}
      required={required}
      control={control}
      name={contactEmailField}
      onClick={handleCheckValidEmail}
      isLoading={isLoadingCheck}
      setIsValidToastOpen={setIsValidToastOpen}
      isButtonHidden={isVerified}
      tip={helperText}
      isTip={isTip}
      toast={
        <EmailToast
          title={isEmailDuplicateError ? '중복된 이메일이에요' : '사용 가능한 이메일이에요'}
          isToastOpen={isValidToastOpen}
          setIsToastOpen={setIsValidToastOpen}
          isError={isEmailDuplicateError}
        />
      }
    />
  );
};

export default ContactEmailInput;
