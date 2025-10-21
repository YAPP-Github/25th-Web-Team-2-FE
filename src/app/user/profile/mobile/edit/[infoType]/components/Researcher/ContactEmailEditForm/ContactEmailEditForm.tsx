'use client';

import { FormProvider, useWatch } from 'react-hook-form';

import { useFormResearcherProfileEdit } from '../../../hooks/useFormResearcherProfileEdit';
import EditFormLayout from '../../EditFormLayout/EditFormLayout';
import SaveButton from '../../SaveButton';

import { ResearcherResponse } from '@/apis/login';
import ContactEmailInput from '@/components/ContactEmailInput/ContactEmailInput';
import EmailBadge from '@/components/EmailBadge/EmailBadge';
import { ResearcherUpdateSchemaType } from '@/schema/profile/ResearcherUpdateSchema';

interface ContactEmailEditFormProps {
  userInfo: ResearcherResponse;
}

const ContactEmailEditForm = ({ userInfo }: ContactEmailEditFormProps) => {
  const { form, isLoading, onSubmit } = useFormResearcherProfileEdit(userInfo);

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
        <ContactEmailInput<ResearcherUpdateSchemaType>
          contactEmailField="contactEmail"
          verifiedEmailField="verifiedContactEmail"
          joinedUser
          autoFocus
        />
        <SaveButton<ResearcherUpdateSchemaType>
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
