import { ParticipantResponse } from '@/apis/login';
import ProfileItem from '../ProfileItem/ProfileItem';
import { MOBILE_PARTICIPANT_PROFILE_FIELDS_MAP } from '../MobileProfileSectionMap';

interface ParticipantProfileSectionProps {
  userInfo: ParticipantResponse;
  goToEditPage: (infoType?: string) => void;
}

const ParticipantProfileSection = ({ userInfo, goToEditPage }: ParticipantProfileSectionProps) => {
  return (
    <>
      {MOBILE_PARTICIPANT_PROFILE_FIELDS_MAP.map((field) => (
        <ProfileItem
          key={field.title}
          required={field.required}
          title={field.title}
          label={typeof field.getLabel === 'function' ? field.getLabel(userInfo) : ''}
          isIcon={field.isIcon}
          isArrow={field.isArrow}
          onClick={() => goToEditPage(field.infoType)}
          rightElement={
            typeof field.rightElement === 'function'
              ? field.rightElement(userInfo)
              : field.rightElement
          }
        />
      ))}
    </>
  );
};

export default ParticipantProfileSection;
