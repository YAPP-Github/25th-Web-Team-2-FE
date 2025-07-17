import Toggle from '@/components/Toggle/Toggle';
import useFormParticipantUserInfo from '../../../hooks/useFormParticipantUserInfo';
import { useWatch } from 'react-hook-form';
import { ParticipantResponse } from '@/apis/login';

interface AdConsentToggleProps {
  userInfo: ParticipantResponse;
}

const AdConsentToggle = ({ userInfo }: AdConsentToggleProps) => {
  const { form, handleSubmit } = useFormParticipantUserInfo({ userInfo });
  const adConsent = useWatch({ name: 'adConsent', control: form.control });

  const onSubmit = handleSubmit();

  const handleChange = () => {
    form.setValue('adConsent', !adConsent);
    onSubmit();
  };

  return <Toggle value={adConsent} onChange={handleChange} />;
};

export default AdConsentToggle;
