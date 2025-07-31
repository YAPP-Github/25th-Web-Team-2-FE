'use client';

import { Participant } from './components/Participant';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import BackHeader from '@/components/Header/BackHeader/BackHeader';
import { isParticipantInfo } from '@/utils/typeGuard';

const PARTICIPANT_EDIT_COMPONENT_MAP = {
  'participant-contact-email': Participant.ContactEmail,
  'participant-name': Participant.Name,
  address: Participant.Address,
  'match-type': Participant.MatchType,
} as const;

interface PageProps {
  params: {
    infoType: keyof typeof PARTICIPANT_EDIT_COMPONENT_MAP;
  };
}

const EditProfilePage = ({ params }: PageProps) => {
  const { infoType } = params;
  const { userInfo } = useUserInfo();

  const EditComponent = PARTICIPANT_EDIT_COMPONENT_MAP[infoType];

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
