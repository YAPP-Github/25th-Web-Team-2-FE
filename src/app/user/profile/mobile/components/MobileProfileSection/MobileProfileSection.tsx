import ProfileItem from '../ProfileItem/ProfileItem';

import { profileSectionLayout } from './MobileProfileSection.css';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { isParticipantInfo } from '@/utils/typeGuard';
import { ParticipantResponse } from '@/apis/login';
import { useSession } from 'next-auth/react';
import { AREA_MAPPER, REGION_MAPPER } from '@/app/home/home.constants';
import MatchConsentToggle from '../MatchConsentToggle/MatchConsentToggle';
import AdConsentToggle from '../AdConsentToggle/AdConsentToggle';

const MOBILE_PROFILE_FIELDS_MAP = {
  PARTICIPANT: [
    {
      required: true,
      title: '연락 받을 이메일',
      getLabel: (userInfo: ParticipantResponse) => userInfo.memberInfo.contactEmail,
    },
    {
      required: true,
      title: '이름',
      getLabel: (userInfo: ParticipantResponse) => userInfo.memberInfo.name,
    },
    {
      required: true,
      title: '거주 지역',
      getLabel: (userInfo: ParticipantResponse) => {
        const region = REGION_MAPPER[userInfo.basicAddressInfo.region];
        const area = AREA_MAPPER[userInfo.basicAddressInfo.area];
        const isAdditionalAddress = userInfo.additionalAddressInfo.region !== 'NONE';

        if (isAdditionalAddress) {
          const additionalRegion = REGION_MAPPER[userInfo.additionalAddressInfo.region];
          const additionalArea = AREA_MAPPER[userInfo.additionalAddressInfo.area];

          return `${region} ${area} / ${additionalRegion} ${additionalArea}`;
        }

        return `${region} ${area}`;
      },
      isIcon: true,
    },
    {
      title: '선호 실험 진행 방식',
      getLabel: (userInfo: ParticipantResponse) => userInfo.matchType ?? '-',
    },
    {
      title: '광고성 정보 이메일/SMS 수신 동의',
      rightElement: (userInfo: ParticipantResponse) => <AdConsentToggle userInfo={userInfo} />,
      isArrow: false,
    },
    {
      title: '개인정보 수집 및 이용 동의-실험 추천·혜택',
      rightElement: (userInfo: ParticipantResponse) => <MatchConsentToggle userInfo={userInfo} />,
      isArrow: false,
    },
  ],
  RESEARCHER: [],
};

const MobileProfileSection = () => {
  const { userInfo } = useUserInfo();
  const { data } = useSession();
  const role = data?.role;

  const fields = role ? MOBILE_PROFILE_FIELDS_MAP[role] : [];

  if (!isParticipantInfo(userInfo)) return null;

  return (
    <section className={profileSectionLayout}>
      {fields.map((field) => (
        <ProfileItem
          key={field.title}
          required={field.required}
          title={field.title}
          label={typeof field.getLabel === 'function' ? field.getLabel(userInfo) : ''}
          isIcon={field.isIcon}
          isArrow={field.isArrow}
          rightElement={
            typeof field.rightElement === 'function'
              ? field.rightElement(userInfo)
              : field.rightElement
          }
        />
      ))}
    </section>
  );
};

export default MobileProfileSection;
