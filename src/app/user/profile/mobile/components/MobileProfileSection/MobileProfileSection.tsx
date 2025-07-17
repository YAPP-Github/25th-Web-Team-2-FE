import ProfileItem from '../ProfileItem/ProfileItem';

import Icon from '@/components/Icon';

const MobileProfileSection = () => {
  return (
    <div style={{ padding: '1.6rem' }}>
      <ProfileItem required title="연락 받을 이메일" label="Yap@gmail.com" />
      <ProfileItem required title="이름" label="김참여" />
      <ProfileItem
        required
        isIcon
        title="거주 지역"
        label="서울특별시 성동구 / 서울특별시 광진구"
      />
      <ProfileItem title="선호 실험 진행 방식" label="전체" />
      <ProfileItem
        title="광고성 정보 이메일/SMS 수신 동의"
        rightElement={<Icon icon="Airplane" />}
        isArrow={false}
      />
      <ProfileItem
        title="개인정보 수집 및 이용 동의-실험 추천·혜택"
        rightElement={<Icon icon="Airplane" />}
        isArrow={false}
      />
    </div>
  );
};

export default MobileProfileSection;
