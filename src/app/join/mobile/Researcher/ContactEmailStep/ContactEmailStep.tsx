import { LoginProvider } from '@/types/user';

interface ContactEmailStepProps {
  provider?: LoginProvider;
  oauthEmail?: string;
  onNext: () => void;
}

const ContactEmailStep = ({ provider, oauthEmail, onNext }: ContactEmailStepProps) => {
  return <div>ContactEmailStep</div>;
};

export default ContactEmailStep;
