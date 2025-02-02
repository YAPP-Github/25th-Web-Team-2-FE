import { useEffect, useState } from 'react';

import { ServiceAgreeCheck } from '../JoinPage.types';

import { ROLE } from '@/constants/config';
import useSessionStorage from '@/hooks/useSessionStorage';

const useServiceAgreeCheck = () => {
  const role = useSessionStorage('role');

  const [serviceAgreeCheck, setServiceAgreeCheck] = useState<ServiceAgreeCheck>({
    isTermOfService: false,
    isPrivacy: false,
    isAdvertise: false,
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

  useEffect(() => {
    if (role && role === ROLE.participant) {
      setServiceAgreeCheck((prev) => ({ ...prev, isRecommend: false }));
    }
  }, [role]);

  return { serviceAgreeCheck, handleAllCheck, handleChangeCheck };
};

export default useServiceAgreeCheck;
