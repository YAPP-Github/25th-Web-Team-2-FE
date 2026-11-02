import { FieldValues, Path, useFormContext, useFormState } from 'react-hook-form';

import Button from '@common/Button';
import { bottomButtonLayout } from '@join/mobile/page.css';

interface SaveButtonProps<T extends FieldValues> {
  onSave: () => void;
  fields: Path<T>[];
  isLoading?: boolean;
  disabled?: boolean;
}

const SaveButton = <T extends FieldValues>({
  onSave,
  fields,
  isLoading = false,
  disabled = false,
}: SaveButtonProps<T>) => {
  const { control } = useFormContext<T>();

  const { errors } = useFormState({ control, name: fields });
  const hasValidationErrors = fields.some((field) => errors[field]);

  return (
    <div className={bottomButtonLayout}>
      <Button
        variant="primary"
        size="small"
        height="56px"
        disabled={hasValidationErrors || isLoading || disabled}
        onClick={onSave}
      >
        {isLoading ? '저장중...' : '저장'}
      </Button>
    </div>
  );
};

export default SaveButton;
