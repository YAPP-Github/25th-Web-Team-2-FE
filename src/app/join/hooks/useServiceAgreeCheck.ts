import { useState } from 'react';

import { ServiceAgreeCheck } from '../JoinPage.types';

const useServiceAgreeCheck = () => {
  const [serviceAgreeCheck, setServiceAgreeCheck] = useState<ServiceAgreeCheck>({
    isTermOfService: false,
    isPrivacy: false,
    isAdvertise: false,
  });

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggleChecked = e.target.checked;

    setServiceAgreeCheck((prev) => ({
      ...prev,
      isTermOfService: toggleChecked,
      isPrivacy: toggleChecked,
      isAdvertise: toggleChecked,
    }));
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setServiceAgreeCheck((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  return { serviceAgreeCheck, handleAllCheck, handleChangeCheck };
};

export default useServiceAgreeCheck;
