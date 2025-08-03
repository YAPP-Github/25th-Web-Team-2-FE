import { useWatch } from 'react-hook-form';

import useFormResearcherUserInfo from '../../../hooks/useFormResearcherUserInfo';

import { ResearcherResponse } from '@/apis/login';
import Toggle from '@/components/Toggle/Toggle';

interface ResearcherAdConsentToggleProps {
  userInfo: ResearcherResponse;
}

const ResearcherAdConsentToggle = ({ userInfo }: ResearcherAdConsentToggleProps) => {
  const { form, handleSubmit } = useFormResearcherUserInfo({ userInfo });
  const adConsent = useWatch({ name: 'adConsent', control: form.control });

  const onSubmit = handleSubmit();

  const handleChange = () => {
    form.setValue('adConsent', !adConsent);
    onSubmit();
  };

  return <Toggle value={adConsent} onChange={handleChange} />;
};

export default ResearcherAdConsentToggle;
