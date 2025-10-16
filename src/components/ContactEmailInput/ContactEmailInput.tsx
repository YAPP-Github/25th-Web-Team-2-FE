import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form';

import useCheckValidJoinEmailMutation from '@/app/join/hooks/useCheckValidJoinEmailMutation';
import useCheckValidProfileEmailMutation from '@/app/join/hooks/useCheckValidProfileEmailMutation';
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
  joinedUser?: boolean;
  autoFocus?: boolean;
}

const ContactEmailInput = <T extends FieldValues>({
  contactEmailField,
  verifiedEmailField,
  helperText,
  isTip = false,
  title,
  required = false,
  joinedUser = false,
  onSuccess,
  autoFocus = false,
}: ContactEmailInputProps<T>) => {
  const toast = useToast();
  const { control, getValues, setValue } = useFormContext<T>();
  const verifiedContactEmail = useWatch({ name: verifiedEmailField, control });
  const contactEmail = useWatch({ name: contactEmailField, control });

  const { mutate: checkValidJoinEmail, isPending: isLoadingCheck } =
    useCheckValidJoinEmailMutation();
  const { mutate: checkValidProfileEmail, isPending: isLoadingCheckProfile } =
    useCheckValidProfileEmailMutation();

  const isVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  const handleCheckValidEmail = async () => {
    const checkValidEmailFn = joinedUser ? checkValidProfileEmail : checkValidJoinEmail;

    checkValidEmailFn(getValues(contactEmailField), {
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
      isLoading={isLoadingCheck || isLoadingCheckProfile}
      isButtonHidden={isVerified}
      tip={helperText}
      isTip={isTip}
      autoFocus={autoFocus}
    />
  );
};

export default ContactEmailInput;
