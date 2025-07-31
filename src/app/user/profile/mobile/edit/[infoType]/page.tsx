'use client';

import {
  isParticipantParams,
  isResearcherParams,
  PARTICIPANT_EDIT_COMPONENT_MAP,
  RESEARCHER_EDIT_COMPONENT_MAP,
} from './ProfileEdit.constants';
import { ParticipantParams, ResearcherParams } from './ProfileEdit.types';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { isParticipantInfo, isResearcherInfo } from '@/utils/typeGuard';

interface PageProps {
  params: {
    infoType: ParticipantParams | ResearcherParams;
  };
}

const EditProfilePage = ({ params }: PageProps) => {
  const { infoType } = params;
  const { userInfo } = useUserInfo();

  const isParticipant = isParticipantInfo(userInfo) && isParticipantParams(infoType);
  const isResearcher = isResearcherInfo(userInfo) && isResearcherParams(infoType);

  if (!userInfo) {
    return null;
  }

  if (isParticipant) {
    const ParticipantEditComponent = PARTICIPANT_EDIT_COMPONENT_MAP[infoType];

    return <ParticipantEditComponent userInfo={userInfo} />;
  }

  if (isResearcher) {
    const ResearcherEditComponent = RESEARCHER_EDIT_COMPONENT_MAP[infoType];

    return <ResearcherEditComponent userInfo={userInfo} />;
  }
};

export default EditProfilePage;
