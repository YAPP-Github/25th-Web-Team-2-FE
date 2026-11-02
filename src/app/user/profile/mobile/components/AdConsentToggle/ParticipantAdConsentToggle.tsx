import { useWatch } from 'react-hook-form';


import { ParticipantResponse } from '@apis/login';
import Toggle from '@common/Toggle';

import useFormParticipantUserInfo from '../../../hooks/useFormParticipantUserInfo';

interface ParticipantAdConsentToggleProps {
  userInfo: ParticipantResponse;
}

const ParticipantAdConsentToggle = ({ userInfo }: ParticipantAdConsentToggleProps) => {
  const { form, handleSubmit } = useFormParticipantUserInfo({ userInfo });
  const adConsent = useWatch({ name: 'adConsent', control: form.control });

  const onSubmit = handleSubmit();

  const handleChange = () => {
    form.setValue('adConsent', !adConsent);
    onSubmit();
  };

  return <Toggle value={adConsent} onChange={handleChange} />;
};

export default ParticipantAdConsentToggle;
