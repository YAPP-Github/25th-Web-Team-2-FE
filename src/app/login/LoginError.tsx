'use client';

import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useEffect, useState } from 'react';

import EmailToast from '../join/components/EmailToast/EmailToast';

const LoginError = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const storedErrorMessage = queryClient.getQueryData<string>(['loginError']);

    if (storedErrorMessage) {
      setErrorMessage(storedErrorMessage);
      setIsOpen(true);
      queryClient.removeQueries({ queryKey: ['loginError'] });
    }
  }, [queryClient]);

  return (
    <>
      {children}
      {isOpen && (
        <EmailToast title={errorMessage} isToastOpen={isOpen} setIsToastOpen={close} isError />
      )}
    </>
  );
};

export default LoginError;
