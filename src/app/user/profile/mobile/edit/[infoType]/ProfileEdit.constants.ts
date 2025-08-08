import { Participant } from './components/Participant';
import { Researcher } from './components/Researcher';

export const PARTICIPANT_EDIT_COMPONENT_MAP = {
  'participant-contact-email': Participant.ContactEmail,
  'participant-name': Participant.Name,
  address: Participant.Address,
  'match-type': Participant.MatchType,
} as const;

export const RESEARCHER_EDIT_COMPONENT_MAP = {
  'researcher-contact-email': Researcher.ContactEmail,
  'researcher-name': Researcher.Name,
  'univ-info': Researcher.UnivInfo,
} as const;

export const isParticipantParams = (
  infoType: string,
): infoType is keyof typeof PARTICIPANT_EDIT_COMPONENT_MAP =>
  infoType in PARTICIPANT_EDIT_COMPONENT_MAP;

export const isResearcherParams = (
  infoType: string,
): infoType is keyof typeof RESEARCHER_EDIT_COMPONENT_MAP =>
  infoType in RESEARCHER_EDIT_COMPONENT_MAP;
