import * as Tabs from '@radix-ui/react-tabs';

import { tabContent, tabList, tabsRoot, tabTrigger } from './ExperimentPostTabs.css';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostMobileDetailContent from '../ExperimentPostMobileDetailContent/ExperimentPostMobileDetailContent';
import ExperimentPostSummary from '../ExperimentPostSummary/ExperimentPostSummary';

const ExperimentPostTabs = ({
  postDetailData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}) => {
  return (
    <Tabs.Root className={tabsRoot} defaultValue="summary">
      <Tabs.List className={tabList}>
        <Tabs.Trigger className={tabTrigger} value="summary">
          간편 요약
        </Tabs.Trigger>
        <Tabs.Trigger className={tabTrigger} value="original">
          공고 원문
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className={tabContent} value="summary">
        <ExperimentPostSummary postDetailData={postDetailData} />
      </Tabs.Content>

      <Tabs.Content className={tabContent} value="original">
        <ExperimentPostMobileDetailContent postDetailData={postDetailData} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ExperimentPostTabs;
