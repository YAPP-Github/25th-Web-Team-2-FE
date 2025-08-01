'use client';

import AddressEditForm from './components/AddressEditForm/AddressEditForm';
import ContactEmailEditForm from './components/ContactEmailEditForm';
import MatchTypeEditForm from './components/MatchTypeEditForm';
import NameEditForm from './components/NameEditForm';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import BackHeader from '@/components/Header/BackHeader/BackHeader';
import { isParticipantInfo } from '@/utils/typeGuard';

const INFO_TYPE_COMPONENT_MAP = {
  'contact-email': ContactEmailEditForm,
  name: NameEditForm,
  address: AddressEditForm,
  'match-type': MatchTypeEditForm,
} as const;

interface PageProps {
  params: {
    infoType: keyof typeof INFO_TYPE_COMPONENT_MAP;
  };
}

const EditProfilePage = ({ params }: PageProps) => {
  const { infoType } = params;
  const { userInfo } = useUserInfo();

  const EditComponent = INFO_TYPE_COMPONENT_MAP[infoType];

  if (isParticipantInfo(userInfo)) {
    return (
      <>
        <BackHeader />
        <EditComponent userInfo={userInfo} />
      </>
    );
  }

  return null;
};

export default EditProfilePage;
