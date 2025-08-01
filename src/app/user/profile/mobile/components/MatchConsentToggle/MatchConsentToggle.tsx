import { useWatch } from 'react-hook-form';

import useFormParticipantUserInfo from '../../../hooks/useFormParticipantUserInfo';

import { ParticipantResponse } from '@/apis/login';
import Toggle from '@/components/Toggle/Toggle';

interface MatchConsentToggleProps {
  userInfo: ParticipantResponse;
}

const MatchConsentToggle = ({ userInfo }: MatchConsentToggleProps) => {
  const { form, handleSubmit } = useFormParticipantUserInfo({ userInfo });
  const matchConsent = useWatch({ name: 'matchConsent', control: form.control });

  const onSubmit = handleSubmit();

  const handleChange = () => {
    form.setValue('matchConsent', !matchConsent);
    onSubmit();
  };

  return <Toggle value={matchConsent} onChange={handleChange} />;
};

export default MatchConsentToggle;
