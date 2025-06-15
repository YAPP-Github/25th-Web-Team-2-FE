import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form';

import Button from '@/components/Button/Button';

interface JoinButtonProps<T extends FieldValues> {
  validationFields: Path<T>[];
  onSubmit: () => void;
  width?: string;
  height?: string;
}

const JoinButton = <T extends FieldValues>({
  validationFields,
  onSubmit,
  width = '100%',
  height = 'fit-content',
}: JoinButtonProps<T>) => {
  const { control } = useFormContext<T>();
  const values = useWatch({ name: validationFields, control });

  const isAllFilled = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);

  return (
    <Button
      type="submit"
      variant="primary"
      size="medium"
      onClick={onSubmit}
      disabled={!isAllFilled}
      width={width}
      height={height}
    >
      회원가입
    </Button>
  );
};

export default JoinButton;
