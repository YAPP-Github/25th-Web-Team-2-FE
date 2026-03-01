'use client';

import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';

import { useToast } from '@/hooks/useToast';

const LoginError = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  useEffect(() => {
    const storedErrorMessage = queryClient.getQueryData<string>(['loginError']);

    if (storedErrorMessage) {
      toast.error({ message: storedErrorMessage, duration: 2000 });
      queryClient.removeQueries({ queryKey: ['loginError'] });
    }
  }, [queryClient, toast]);

  return <>{children}</>;
};

export default LoginError;
