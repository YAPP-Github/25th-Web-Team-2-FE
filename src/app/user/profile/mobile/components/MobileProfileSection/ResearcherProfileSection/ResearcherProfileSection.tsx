import { ResearcherResponse } from '@/apis/login';
import ProfileItem from '../ProfileItem/ProfileItem';
import { MOBILE_RESEARCHER_PROFILE_FIELDS_MAP } from '../MobileProfileSectionMap';

interface ResearcherProfileSectionProps {
  userInfo: ResearcherResponse;
  goToEditPage: (infoType?: string) => void;
}

const ResearcherProfileSection = ({ userInfo, goToEditPage }: ResearcherProfileSectionProps) => {
  return (
    <>
      {MOBILE_RESEARCHER_PROFILE_FIELDS_MAP.map((field) => (
        <ProfileItem
          key={field.title}
          required={field.required}
          title={field.title}
          label={typeof field.getLabel === 'function' ? field.getLabel(userInfo) : ''}
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

export default ResearcherProfileSection;
