import * as Tabs from '@radix-ui/react-tabs';

import MobileMyPosts from './MobileMyPosts/MobileMyPosts';
import ResearcherProfileSection from './ResearcherProfileSection/ResearcherProfileSection';
import { tabContent, tabList, tabsRoot, tabTrigger } from './ResearcherProfileTab.css';

import { ResearcherResponse } from '@/apis/login';

interface ResearcherProfileTabProps {
  userInfo: ResearcherResponse;
  goToEditPage: (infoType?: string) => void;
}

const ResearcherProfileTab = ({ userInfo, goToEditPage }: ResearcherProfileTabProps) => {
  return (
    <Tabs.Root className={tabsRoot} defaultValue="myPosts">
      <Tabs.List className={tabList}>
        <Tabs.Trigger className={tabTrigger} value="myPosts">
          내가 쓴 글
        </Tabs.Trigger>
        <Tabs.Trigger className={tabTrigger} value="profile">
          내 정보 수정
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className={tabContent} value="myPosts">
        <MobileMyPosts />
      </Tabs.Content>

      <Tabs.Content className={tabContent} value="profile">
        <ResearcherProfileSection userInfo={userInfo} goToEditPage={goToEditPage} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ResearcherProfileTab;
