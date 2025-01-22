import { useState } from 'react';

import { ServiceAgreeCheck } from '../JoinPage.types';

import { ROLE } from '@/constants/config';

const useServiceAgreeCheck = (role: string = ROLE.researcher) => {
  const [serviceAgreeCheck, setServiceAgreeCheck] = useState<ServiceAgreeCheck>({
    isTermOfService: false,
    isPrivacy: false,
    isAdvertise: false,
    isRecommend: role === ROLE.participant ? false : undefined,
  });

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggleChecked = e.target.checked;

    setServiceAgreeCheck((prev) => ({
      ...prev,
      ...(prev.isRecommend !== undefined && { isRecommend: toggleChecked }),
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
