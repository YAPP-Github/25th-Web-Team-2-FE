import { useFormContext, useWatch } from 'react-hook-form';


import Button from '@common/Button';
import { ResearcherJoinSchemaType } from '@schema/join/ResearcherJoinSchema';

import { bottomButtonLayout } from '../../../page.css';

interface NextButtonProps {
  onNext: () => void;
}

const NextButton = ({ onNext }: NextButtonProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();

  const contactEmail = useWatch({ name: 'contactEmail', control });
  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control });

  const isEmailVerified = Boolean(verifiedContactEmail);
  const isVerified = isEmailVerified && verifiedContactEmail === contactEmail;

  return (
    <>
      {isEmailVerified && (
        <div className={bottomButtonLayout}>
          <Button
            variant="primary"
            size="small"
            height="56px"
            disabled={!isVerified}
            onClick={onNext}
          >
            다음
          </Button>
        </div>
      )}
    </>
  );
};

export default NextButton;
