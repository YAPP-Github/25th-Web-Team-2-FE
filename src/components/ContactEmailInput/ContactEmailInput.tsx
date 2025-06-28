import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form';

import useCheckValidEmailInfoMutation from '@/app/join/hooks/useCheckValidEmailInfoMutation';
import ButtonInput from '@/components/ButtonInput/ButtonInput';
import { useToast } from '@/hooks/useToast';

interface ContactEmailInputProps<T extends FieldValues> {
  contactEmailField: Path<T>;
  verifiedEmailField: Path<T>;
  helperText?: string;
  isTip?: boolean;
  title?: string;
  required?: boolean;
  onSuccess?: () => void;
}

const ContactEmailInput = <T extends FieldValues>({
  contactEmailField,
  verifiedEmailField,
  helperText,
  isTip = false,
  title,
  required = false,
  onSuccess,
}: ContactEmailInputProps<T>) => {
  const { control, getValues, setValue } = useFormContext<T>();
  const verifiedContactEmail = useWatch({ name: verifiedEmailField, control });
  const contactEmail = useWatch({ name: contactEmailField, control });

  const { mutate: checkValidEmail, isPending: isLoadingCheck } = useCheckValidEmailInfoMutation();
  const toast = useToast();

  const isVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  const handleCheckValidEmail = async () => {
    checkValidEmail(getValues(contactEmailField), {
      onSuccess: () => {
        setValue(verifiedEmailField, getValues(contactEmailField));
        toast.open({ message: '사용 가능한 이메일이에요' });
        onSuccess?.();
      },
      onError: () => {
        toast.error({ message: '중복된 이메일이에요' });
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
      isButtonHidden={isVerified}
      tip={helperText}
      isTip={isTip}
    />
  );
};

export default ContactEmailInput;
