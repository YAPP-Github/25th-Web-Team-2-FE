'use client';

import { FormProvider, useWatch } from 'react-hook-form';

import EditFormLayout from './EditFormLayout';

import { ParticipantResponse } from '@/apis/login';
import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import EmailBadge from '@/components/EmailBadge/EmailBadge';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';
import SaveButton from './SaveButton';
import { useFormProfileEdit } from '../hooks/useFormProfileEdit';

interface ContactEmailEditFormProps {
  userInfo: ParticipantResponse;
}

const ContactEmailEditForm = ({ userInfo }: ContactEmailEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormProfileEdit(userInfo);

  const contactEmail = useWatch({ name: 'contactEmail', control: form.control });
  const verifiedContactEmail = useWatch({ name: 'verifiedContactEmail', control: form.control });

  const isEmailVerified = Boolean(verifiedContactEmail) && verifiedContactEmail === contactEmail;

  return (
    <FormProvider {...form}>
      <EditFormLayout
        title="연락 받을 이메일을 입력해주세요"
        description="로그인 아이디와 달라도 괜찮아요"
        emailBadge={
          <EmailBadge
            provider={userInfo.memberInfo.provider}
            oauthEmail={userInfo.memberInfo.oauthEmail}
          />
        }
      >
        <ContactEmailInput<ParticipantUpdateSchemaType>
          contactEmailField="contactEmail"
          verifiedEmailField="verifiedContactEmail"
        />
        <SaveButton
          onSave={onSubmit}
          fields={['contactEmail']}
          isLoading={isLoading}
          disabled={!isEmailVerified}
        />
      </EditFormLayout>
    </FormProvider>
  );
};

export default ContactEmailEditForm;
