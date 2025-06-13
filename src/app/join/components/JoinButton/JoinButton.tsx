import { useFormContext, useWatch } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface JoinButtonProps {
  onSubmit: () => void;
  width?: string;
  height?: string;
}

const JoinButton = ({ onSubmit, width = '100%', height = 'fit-content' }: JoinButtonProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ResearcherJoinSchemaType>();
  const values = useWatch({ name: ['name', 'univName', 'major'], control });
  const isAllFilled = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);

  const isValidForm = isAllFilled && Object.keys(errors).length === 0;

  return (
    <Button
      type="submit"
      variant="primary"
      size="medium"
      onClick={onSubmit}
      disabled={!isValidForm}
      width={width}
      height={height}
    >
      회원가입
    </Button>
  );
};

export default JoinButton;
