import Button from '@/components/Button/Button';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { useFormContext, useWatch } from 'react-hook-form';

interface JoinButtonProps {
  onSubmit: () => void;
}

const JoinButton = ({ onSubmit }: JoinButtonProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ResearcherJoinSchemaType>();
  const values = useWatch({ name: ['name', 'univName', 'major'], control });
  const isAllFilled = values.every((value) => (value ?? '').trim() !== '' && value !== undefined);

  const isValidForm = !(isAllFilled && Object.keys(errors).length === 0);

  return (
    <Button
      type="submit"
      variant="primary"
      size="medium"
      onClick={onSubmit}
      disabled={!isValidForm}
      width="20rem"
    >
      회원가입
    </Button>
  );
};

export default JoinButton;
