import ProfileItem from '../ProfileItem/ProfileItem';

import Icon from '@/components/Icon';
import { profileSectionLayout } from './MobileProfileSection.css';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { isParticipantInfo } from '@/utils/typeGuard';
import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { useSession } from 'next-auth/react';
import { AREA_MAPPER, REGION_MAPPER } from '@/app/home/home.constants';

const PROFILE_FIELDS_MAP = {
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
      getLabel: (userInfo: ParticipantResponse) =>
        userInfo.basicAddressInfo
          ? `${REGION_MAPPER[userInfo.basicAddressInfo.region]} / ${
              AREA_MAPPER[userInfo.basicAddressInfo.area]
            }`
          : '',
      isIcon: true,
    },
    {
      title: '선호 실험 진행 방식',
      getLabel: (userInfo: ParticipantResponse) => userInfo.matchType ?? '-',
    },
    {
      title: '광고성 정보 이메일/SMS 수신 동의',
      rightElement: <Icon icon="Airplane" />,
      isArrow: false,
    },
    {
      title: '개인정보 수집 및 이용 동의-실험 추천·혜택',
      rightElement: <Icon icon="Airplane" />,
      isArrow: false,
    },
  ],
  RESEARCHER: [],
};

const MobileProfileSection = () => {
  const { userInfo } = useUserInfo();
  const { data } = useSession();
  const role = data?.role;

  const fields = role ? PROFILE_FIELDS_MAP[role] : [];

  if (isParticipantInfo(userInfo)) {
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
            rightElement={field.rightElement}
          />
        ))}
      </section>
    );
  }

  return null;
};

export default MobileProfileSection;
