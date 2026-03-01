import {
  PARTICIPANT_EDIT_COMPONENT_MAP,
  RESEARCHER_EDIT_COMPONENT_MAP,
} from '../constants/componentMap';

export type ParticipantParams = keyof typeof PARTICIPANT_EDIT_COMPONENT_MAP;
export type ResearcherParams = keyof typeof RESEARCHER_EDIT_COMPONENT_MAP;
