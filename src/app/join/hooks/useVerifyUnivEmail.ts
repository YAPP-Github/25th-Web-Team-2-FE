import { useState } from 'react';

const useVerifyUnivEmail = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  const handleResetVerifyEmail = () => {
    setIsEmailVerified(false);
  };

  return { isEmailVerified, handleVerifyEmail, handleResetVerifyEmail };
};

export default useVerifyUnivEmail;
