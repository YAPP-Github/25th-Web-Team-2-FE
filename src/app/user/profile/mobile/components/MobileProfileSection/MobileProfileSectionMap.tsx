import ParticipantAdConsentToggle from '../AdConsentToggle/ParticipantAdConsentToggle';
import ResearcherAdConsentToggle from '../AdConsentToggle/ResearcherAdConsentToggle';
import MatchConsentToggle from '../MatchConsentToggle/MatchConsentToggle';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { AREA_MAPPER, REGION_MAPPER } from '@/app/home/home.constants';
import { getMatchTypeLabel } from '@/app/user/profile/ProfilePage.utils';
import { AreaType, RegionType } from '@/types/filter';

export const MOBILE_PARTICIPANT_PROFILE_FIELDS_MAP = [
  {
    required: true,
    title: '연락 받을 이메일',
    getLabel: (userInfo: ParticipantResponse) => userInfo.memberInfo.contactEmail,
    infoType: 'participant-contact-email',
  },
  {
    required: true,
    title: '이름',
    getLabel: (userInfo: ParticipantResponse) => userInfo.memberInfo.name,
    infoType: 'participant-name',
  },
  {
    required: true,
    title: '거주 지역',
    getLabel: (userInfo: ParticipantResponse) => {
      const region = REGION_MAPPER[userInfo.basicAddressInfo.region as RegionType];
      const area = AREA_MAPPER[userInfo.basicAddressInfo.area as AreaType];
      const isAdditionalAddress = userInfo.additionalAddressInfo.region !== 'NONE';

      if (isAdditionalAddress) {
        const additionalRegion = REGION_MAPPER[userInfo.additionalAddressInfo.region as RegionType];
        const additionalArea = AREA_MAPPER[userInfo.additionalAddressInfo.area as AreaType];

        return `${region} ${area} / ${additionalRegion} ${additionalArea}`;
      }

      return `${region} ${area}`;
    },
    isIcon: true,
    infoType: 'address',
  },
  {
    title: '선호 실험 진행 방식',
    getLabel: (userInfo: ParticipantResponse) => getMatchTypeLabel(userInfo.matchType),
    infoType: 'match-type',
  },
  {
    title: '광고성 정보 이메일/SMS 수신 동의',
    rightElement: (userInfo: ParticipantResponse) => (
      <ParticipantAdConsentToggle userInfo={userInfo} />
    ),
    isArrow: false,
  },
  {
    title: '개인정보 수집 및 이용 동의-실험 추천·혜택',
    rightElement: (userInfo: ParticipantResponse) => <MatchConsentToggle userInfo={userInfo} />,
    isArrow: false,
  },
];

export const MOBILE_RESEARCHER_PROFILE_FIELDS_MAP = [
  {
    required: true,
    title: '연락 받을 이메일',
    getLabel: (userInfo: ResearcherResponse) => userInfo.memberInfo.contactEmail,
    infoType: 'researcher-contact-email',
  },
  {
    required: true,
    title: '이름',
    getLabel: (userInfo: ResearcherResponse) => userInfo.memberInfo.name,
    infoType: 'researcher-name',
  },
  {
    required: true,
    title: '소속 학교',
    getLabel: (userInfo: ResearcherResponse) => userInfo.univName,
    infoType: 'univ-info',
  },
  {
    required: true,
    title: '소속 학과',
    getLabel: (userInfo: ResearcherResponse) => userInfo.major,
    infoType: 'univ-info',
  },
  {
    title: '소속 연구실 정보',
    getLabel: (userInfo: ResearcherResponse) => userInfo.labInfo,
    infoType: 'univ-info',
  },
  {
    title: '광고성 정보 이메일/SMS 수신 동의',
    rightElement: (userInfo: ResearcherResponse) => (
      <ResearcherAdConsentToggle userInfo={userInfo} />
    ),
    isArrow: false,
  },
];
