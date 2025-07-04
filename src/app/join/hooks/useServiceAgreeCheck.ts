import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { ServiceAgreeCheck } from '../JoinPage.types';

import { ROLE } from '@/constants/config';

interface UseServiceAgreeCheckProps {
  onCheckAdConsent?: (checked: boolean) => void;
  onCheckMatchConsent?: (checked: boolean) => void;
}

const useServiceAgreeCheck = ({
  onCheckAdConsent,
  onCheckMatchConsent,
}: UseServiceAgreeCheckProps = {}) => {
  const { data: session } = useSession();
  const role = session?.role;

  const [serviceAgreeCheck, setServiceAgreeCheck] = useState<ServiceAgreeCheck>({
    isTermOfService: false,
    isPrivacy: false,
    isAdvertise: false,
  });

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggleChecked = e.target.checked;
    onCheckAdConsent?.(toggleChecked);
    onCheckMatchConsent?.(toggleChecked);

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
