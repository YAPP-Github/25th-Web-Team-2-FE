import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';

import useLeaveMutation from './useLeaveMutation';

import LeaveSchema, { LeaveSchemaType } from '@/schema/profile/LeaveSchema';

const useLeaveForm = () => {
  const { control, reset, formState, handleSubmit } = useForm<LeaveSchemaType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(LeaveSchema()),
    defaultValues: {
      reason: '',
    },
  });
  const { mutate: leave } = useLeaveMutation();

  const reasonType = useWatch({ name: 'reasonType', control });
  const reason = useWatch({ name: 'reason', control });

  const reasonCondition =
    reasonType !== 'OTHER' || (reasonType === 'OTHER' && reason.trim().length >= 1);
  const isValidLeave = reasonType && reasonCondition && Object.keys(formState.errors).length === 0;

  const onSubmit = (data: LeaveSchemaType) => {
    const formattedData = {
      reasonType: data.reasonType,
      reason: data.reason === '' ? null : data.reason,
    };

    leave(formattedData, {
      onSuccess: () => {
        signOut({ callbackUrl: '/user/success' });
      },
    });
  };

  return { control, reset, handleSubmit: handleSubmit(onSubmit), isValidLeave };
};

export default useLeaveForm;
