import * as Tabs from '@radix-ui/react-tabs';

import { tabContent, tabList, tabsRoot, tabTrigger } from './ExperimentPostTabs.css';

const ExperimentPostTabs = () => {
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
        이 연구는 만 19세 이상 29세 이하 성인을 대상으로, 스마트폰 앱 및 웨어러블 기기를 통해
        ‘자제력’ 요소를 연구합니다.
      </Tabs.Content>

      <Tabs.Content className={tabContent} value="original">
        안녕하세요. <br />
        먼저, 본 연구에 관심을 갖고 참여해 주셔서 진심으로 감사드립니다. <br />본 연구는 만 19세
        이상부터 만 29세 이하의 성인을 대상으로 스마트폰 애플리케이션 및 웨어러블 기기를 통해 자제와
        관련된 정서, 행동, 사회적 요인들을 살펴보는 “자제 위한 요인 예측을 위한 스마트폰 기반 디지털
        패노타이핑” 연구입니다.
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ExperimentPostTabs;
