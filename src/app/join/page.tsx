'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { FormInput } from './JoinPage.types';
import JoinEmailStep from './JoinEmailStep';

export default function JoinPage() {
  const socialEmail = sessionStorage.getItem('email') || '';

  const methods = useForm<FormInput>({
    defaultValues: {
      socialEmail: socialEmail,
      contactEmail: '',
      univEmail: '',
      authCode: '',
      isAllCheck: false,
      isTermOfService: false,
      isPrivacy: false,
      isAdvertise: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <JoinEmailStep />
    </FormProvider>
  );
}
